# TechRecruit – Landing Page Tuyển Dụng

Landing page tuyển dụng đầy đủ tính năng với ReactJS + Golang + PostgreSQL, deploy tự động lên **Render**.

## 🧱 Cấu trúc dự án

```
recruit-landing/
├── backend/                  # Golang REST API
│   ├── main.go               # Server chính (jobs + applications)
│   ├── go.mod
│   └── .env.example
├── frontend/                 # ReactJS App
│   ├── public/
│   ├── src/
│   │   ├── components/       # Navbar, Hero, Stats, JobsSection…
│   │   ├── services/api.js   # Gọi backend API
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── .github/workflows/
│   ├── backend.yml           # CI/CD Backend → Render
│   └── frontend.yml          # CI/CD Frontend → Render
├── render.yaml               # Render Blueprint (1-click deploy)
└── README.md
```

---

## 🚀 Deploy lên Render (nhanh nhất)

### Cách 1 – Render Blueprint (khuyến nghị)

1. Push code lên GitHub
2. Vào [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**
3. Chọn repo này → Render tự đọc `render.yaml` và tạo:
   - **recruit-be** – Go Web Service
   - **recruit-fe** – React Static Site
   - **recruit-db** – PostgreSQL database
4. Sau khi `recruit-be` deploy xong, copy URL (vd: `https://recruit-be.onrender.com`)
5. Vào **recruit-fe** → Environment → thêm:
   ```
   REACT_APP_API_URL = https://recruit-be.onrender.com
   ```
6. Redeploy frontend là xong ✅

---

### Cách 2 – Deploy thủ công từng service

#### Backend (Go)

1. Render Dashboard → **New Web Service** → chọn repo
2. Cấu hình:
   - **Root Directory**: `backend`
   - **Runtime**: Go
   - **Build Command**: `go build -o server .`
   - **Start Command**: `./server`
3. Add PostgreSQL database: **New** → **PostgreSQL** → copy `DATABASE_URL`
4. Vào backend service → Environment → thêm `DATABASE_URL`

#### Frontend (React)

1. Render Dashboard → **New Static Site** → chọn repo
2. Cấu hình:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `build`
3. Environment → thêm:
   ```
   REACT_APP_API_URL = https://<tên-backend>.onrender.com
   ```

---

## 🔁 CI/CD – GitHub Actions

### Secrets cần tạo trong GitHub repo

| Secret | Cách lấy |
|--------|----------|
| `RENDER_BACKEND_DEPLOY_HOOK` | Render Dashboard → recruit-be → Settings → Deploy Hook |
| `RENDER_FRONTEND_DEPLOY_HOOK` | Render Dashboard → recruit-fe → Settings → Deploy Hook |
| `REACT_APP_API_URL` | URL của backend sau khi deploy |

Tạo tại: **GitHub repo** → Settings → Secrets and variables → Actions → **New repository secret**

### Luồng hoạt động

```
git push main
   ├── có thay đổi backend/** → backend.yml chạy → go vet → go build → curl deploy hook
   └── có thay đổi frontend/** → frontend.yml chạy → npm ci → npm build → curl deploy hook
```

---

## 💻 Chạy local

### Backend

```bash
# 1. Tạo database PostgreSQL local
createdb recruit

# 2. Chạy server
cd backend
DATABASE_URL="postgres://postgres:password@localhost:5432/recruit?sslmode=disable" go run main.go

# Server chạy tại http://localhost:8080
```

### Frontend

```bash
cd frontend

# Tạo file .env.local
echo "REACT_APP_API_URL=http://localhost:8080" > .env.local

npm install
npm start

# App chạy tại http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/health` | Health check |
| `GET` | `/api/jobs` | Lấy danh sách vị trí tuyển dụng |
| `GET` | `/api/jobs?department=Engineering` | Lọc theo bộ phận |
| `GET` | `/api/jobs?type=Full-time` | Lọc theo hình thức |
| `GET` | `/api/jobs?search=react` | Tìm kiếm |
| `POST` | `/api/applications` | Gửi hồ sơ ứng tuyển |

### POST `/api/applications` – Body

```json
{
  "job_id":       1,
  "full_name":    "Nguyễn Văn A",
  "email":        "email@example.com",
  "phone":        "0901234567",
  "cover_letter": "Tôi rất muốn ứng tuyển vị trí này..."
}
```

---

## 🎨 Tính năng giao diện

- **Navbar** – Sticky, transparent → white khi scroll, responsive hamburger
- **Hero** – Animated gradient background, floating particles
- **Stats** – Số liệu công ty (vị trí, nhân viên, năm)
- **Jobs Section** – Lọc realtime theo bộ phận / hình thức / từ khoá
- **Job Cards** – Xem chi tiết, ứng tuyển ngay
- **Application Modal** – Form ứng tuyển với validation
- **About** – Floating cards, danh sách phúc lợi
- **Footer** – Responsive 3 cột
- **Responsive** – Mobile-first, hỗ trợ mọi thiết bị

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, CSS3, no external UI lib |
| Backend | Go 1.21, `net/http`, `lib/pq` |
| Database | PostgreSQL |
| Deploy | Render (free tier) |
| CI/CD | GitHub Actions |
