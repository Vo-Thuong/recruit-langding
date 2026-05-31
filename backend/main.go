package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	_ "github.com/lib/pq"
)

// ─── Models ─────────────────────────────────────────────────────────────────

type Job struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Department   string `json:"department"`
	Location     string `json:"location"`
	JobType      string `json:"job_type"`
	Salary       string `json:"salary"`
	Description  string `json:"description"`
	Requirements string `json:"requirements"`
	CreatedAt    string `json:"created_at"`
}

type Application struct {
	ID          int    `json:"id"`
	JobID       int    `json:"job_id"`
	FullName    string `json:"full_name"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Position    string `json:"position"`
	CoverLetter string `json:"cover_letter"`
}

type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

var db *sql.DB

// ─── Middleware ──────────────────────────────────────────────────────────────

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

// ─── Database ────────────────────────────────────────────────────────────────

func initDB() {
	stmts := []string{
		`CREATE TABLE IF NOT EXISTS jobs (
			id          SERIAL PRIMARY KEY,
			title       VARCHAR(255) NOT NULL,
			department  VARCHAR(100) DEFAULT '',
			location    VARCHAR(100) DEFAULT '',
			job_type    VARCHAR(50)  DEFAULT '',
			salary      VARCHAR(100) DEFAULT '',
			description TEXT         DEFAULT '',
			requirements TEXT        DEFAULT '',
			created_at  TIMESTAMPTZ  DEFAULT NOW()
		)`,
		`CREATE TABLE IF NOT EXISTS applications (
			id           SERIAL PRIMARY KEY,
			job_id       INT,
			full_name    VARCHAR(255) NOT NULL,
			email        VARCHAR(255) NOT NULL,
			phone        VARCHAR(50)  DEFAULT '',
			position     VARCHAR(255) DEFAULT '',
			cover_letter TEXT         DEFAULT '',
			created_at   TIMESTAMPTZ  DEFAULT NOW()
		)`,
	}
	for _, stmt := range stmts {
		if _, err := db.Exec(stmt); err != nil {
			log.Printf("initDB error: %v", err)
		}
	}
	log.Println("Database tables ready")
}

func seedDB() {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM jobs").Scan(&count); err != nil || count > 0 {
		return
	}
	type seed struct{ title, dept, loc, jtype, salary, desc, req string }
	seeds := []seed{
		{
			"Senior Software Engineer (Backend)", "Engineering", "Hà Nội / Remote",
			"Full-time", "$2,000 – $4,000",
			"Xây dựng hệ thống microservices, REST API hiệu suất cao phục vụ hàng triệu người dùng. Bạn sẽ làm việc với công nghệ tiên tiến trong môi trường Agile năng động.",
			"• 3+ năm kinh nghiệm Go / Java / Node.js\n• Kinh nghiệm PostgreSQL, Redis, Kafka\n• Hiểu biết Docker, Kubernetes\n• Kỹ năng thiết kế hệ thống phân tán",
		},
		{
			"Frontend Developer (React / TypeScript)", "Engineering", "TP. Hồ Chí Minh / Remote",
			"Full-time", "$1,500 – $3,000",
			"Xây dựng giao diện người dùng hiện đại cho hàng triệu người dùng. Sử dụng ReactJS, TypeScript và các thư viện UI/UX hiện đại nhất.",
			"• 2+ năm kinh nghiệm React / TypeScript\n• Thành thạo HTML5/CSS3/SCSS\n• Kinh nghiệm REST API, GraphQL\n• Hiểu biết Web Performance Optimization",
		},
		{
			"Product Manager", "Product", "Hà Nội",
			"Full-time", "$2,500 – $4,500",
			"Dẫn dắt product roadmap từ ideation đến launch. Làm việc chặt chẽ với engineering, design và business để tạo ra sản phẩm xuất sắc.",
			"• 3+ năm kinh nghiệm Product Management\n• Kỹ năng phân tích dữ liệu với SQL/Python\n• Kinh nghiệm Agile/Scrum\n• Khả năng giao tiếp và trình bày xuất sắc",
		},
		{
			"UI/UX Designer", "Design", "Remote",
			"Full-time", "$1,200 – $2,500",
			"Thiết kế trải nghiệm người dùng đẳng cấp cho web và mobile. Từ user research, wireframe đến visual design và prototype.",
			"• 2+ năm kinh nghiệm UI/UX Design\n• Thành thạo Figma, Adobe Creative Suite\n• Portfolio sản phẩm thực tế ấn tượng\n• Hiểu biết về Accessibility Standards",
		},
		{
			"DevOps / Cloud Engineer", "Infrastructure", "Hà Nội / Remote",
			"Full-time", "$2,000 – $3,500",
			"Xây dựng và vận hành infrastructure cloud-native, đảm bảo uptime 99.99%. Tự động hóa CI/CD pipeline và hệ thống monitoring.",
			"• 3+ năm kinh nghiệm DevOps/SRE\n• Thành thạo AWS/GCP/Azure\n• Kubernetes, Terraform, Helm\n• CI/CD: GitHub Actions, ArgoCD",
		},
		{
			"Data Analyst", "Data", "TP. Hồ Chí Minh",
			"Full-time", "$1,500 – $2,800",
			"Phân tích dữ liệu kinh doanh, xây dựng dashboard và cung cấp insights quan trọng cho quyết định chiến lược của công ty.",
			"• 2+ năm kinh nghiệm Data Analysis\n• Thành thạo SQL, Python (pandas, numpy)\n• Kinh nghiệm Tableau, Power BI, Metabase\n• Tư duy phân tích và kỹ năng thống kê",
		},
	}
	for _, s := range seeds {
		_, err := db.Exec(
			`INSERT INTO jobs (title,department,location,job_type,salary,description,requirements)
			 VALUES ($1,$2,$3,$4,$5,$6,$7)`,
			s.title, s.dept, s.loc, s.jtype, s.salary, s.desc, s.req,
		)
		if err != nil {
			log.Printf("seed error: %v", err)
		}
	}
	log.Println("Sample jobs seeded")
}

// ─── Handlers ────────────────────────────────────────────────────────────────

func handleJobs(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeJSON(w, http.StatusMethodNotAllowed, Response{Success: false, Message: "Method not allowed"})
		return
	}

	dept   := r.URL.Query().Get("department")
	jtype  := r.URL.Query().Get("type")
	search := r.URL.Query().Get("search")

	query := `SELECT id, title, department, location, job_type, salary, description, requirements,
	           to_char(created_at, 'YYYY-MM-DD') FROM jobs WHERE 1=1`
	args := []interface{}{}
	idx := 1

	if dept != "" {
		query += fmt.Sprintf(" AND LOWER(department) = LOWER($%d)", idx)
		args = append(args, dept)
		idx++
	}
	if jtype != "" {
		query += fmt.Sprintf(" AND LOWER(job_type) = LOWER($%d)", idx)
		args = append(args, jtype)
		idx++
	}
	if search != "" {
		// PostgreSQL supports reusing $N multiple times
		query += fmt.Sprintf(
			" AND (title ILIKE $%d OR department ILIKE $%d OR description ILIKE $%d)",
			idx, idx, idx,
		)
		args = append(args, "%"+search+"%")
		idx++
	}
	query += " ORDER BY created_at DESC"
	_ = idx

	rows, err := db.Query(query, args...)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, Response{Success: false, Message: err.Error()})
		return
	}
	defer rows.Close()

	jobs := []Job{}
	for rows.Next() {
		var j Job
		if err := rows.Scan(
			&j.ID, &j.Title, &j.Department, &j.Location,
			&j.JobType, &j.Salary, &j.Description, &j.Requirements, &j.CreatedAt,
		); err != nil {
			continue
		}
		jobs = append(jobs, j)
	}
	writeJSON(w, http.StatusOK, Response{Success: true, Data: jobs})
}

func handleApplications(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, Response{Success: false, Message: "Method not allowed"})
		return
	}

	var app Application
	if err := json.NewDecoder(r.Body).Decode(&app); err != nil {
		writeJSON(w, http.StatusBadRequest, Response{Success: false, Message: "Invalid JSON body"})
		return
	}

	app.FullName = strings.TrimSpace(app.FullName)
	app.Email    = strings.TrimSpace(app.Email)

	if app.FullName == "" || app.Email == "" {
		writeJSON(w, http.StatusBadRequest, Response{Success: false, Message: "Họ tên và email là bắt buộc"})
		return
	}
	if !strings.Contains(app.Email, "@") || !strings.Contains(app.Email, ".") {
		writeJSON(w, http.StatusBadRequest, Response{Success: false, Message: "Email không hợp lệ"})
		return
	}

	var id int
	err := db.QueryRow(
		`INSERT INTO applications (job_id, full_name, email, phone, position, cover_letter)
		 VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
		app.JobID, app.FullName, app.Email, app.Phone, app.Position, app.CoverLetter,
	).Scan(&id)
	if err != nil {
		log.Printf("insert application error: %v", err)
		writeJSON(w, http.StatusInternalServerError, Response{Success: false, Message: "Lỗi khi lưu hồ sơ, vui lòng thử lại"})
		return
	}

	writeJSON(w, http.StatusCreated, Response{
		Success: true,
		Message: "Hồ sơ đã được gửi thành công! Chúng tôi sẽ liên hệ trong 3–5 ngày làm việc.",
		Data:    map[string]int{"id": id},
	})
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	if err := db.Ping(); err != nil {
		writeJSON(w, http.StatusServiceUnavailable, Response{Success: false, Message: "Database unavailable"})
		return
	}
	writeJSON(w, http.StatusOK, Response{Success: true, Message: "OK"})
}

// ─── Main ─────────────────────────────────────────────────────────────────────

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://postgres:postgres@localhost:5432/recruit?sslmode=disable"
		log.Println("DATABASE_URL not set, using local default")
	}

	var err error
	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("sql.Open: %v", err)
	}
	defer db.Close()

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)

	if err := db.Ping(); err != nil {
		log.Fatalf("db.Ping: %v", err)
	}
	log.Println("Connected to PostgreSQL")

	initDB()
	seedDB()

	mux := http.NewServeMux()
	mux.HandleFunc("/api/jobs", handleJobs)
	mux.HandleFunc("/api/applications", handleApplications)
	mux.HandleFunc("/health", handleHealth)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server listening on :%s", port)
	if err := http.ListenAndServe(":"+port, corsMiddleware(mux)); err != nil {
		log.Fatal(err)
	}
}
