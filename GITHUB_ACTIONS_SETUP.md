# GitHub Actions Setup Guide

## 🚀 Tự động Build & Deploy với GitHub Actions

Dự án này sử dụng GitHub Actions để tự động build, test, và deploy lên Render.

### Workflows có sẵn:

1. **backend.yml** - Build & test backend (Go)
   - Trigger: Khi push vào `backend/**`
   - Trigger: Khi commit thay đổi workflows

2. **frontend.yml** - Build frontend (React)
   - Trigger: Khi push vào `frontend/**`
   - Trigger: Khi commit thay đổi workflows

3. **deploy.yml** - Full pipeline (mới)
   - Build backend + frontend
   - Deploy Blueprint lên Render

---

## 🔑 Setup GitHub Actions Secrets

Để workflows hoạt động, bạn cần thêm Secrets vào GitHub Repository:

### Bước 1: Lấy Render Deployment Webhook

1. Vào Render Dashboard: https://dashboard.render.com/
2. Chọn Blueprint Instance vừa tạo → **Settings**
3. Scroll xuống tìm **"Deploy Webhook"**
4. Copy URL webhook

### Bước 2: Thêm Secrets vào GitHub

1. Vào GitHub Repository: https://github.com/Vo-Thuong/recruit-langding/settings/secrets/actions
2. Click **"New repository secret"**

**Thêm 3 secrets sau:**

| Secret Name                   | Value                               | Description                      |
| ----------------------------- | ----------------------------------- | -------------------------------- |
| `RENDER_DEPLOY_HOOK`          | `https://api.render.com/deploy/...` | URL webhook từ Render Blueprint  |
| `RENDER_BACKEND_DEPLOY_HOOK`  | `https://api.render.com/deploy/...` | URL webhook cho backend service  |
| `RENDER_FRONTEND_DEPLOY_HOOK` | `https://api.render.com/deploy/...` | URL webhook cho frontend service |
| `REACT_APP_API_URL`           | `https://recruit-be.onrender.com`   | Backend API URL                  |

### Bước 3: Trigger Workflow

Chỉ cần push code lên `vothuong` branch:

```bash
git add .
git commit -m "your changes"
git push origin vothuong
```

Workflow sẽ tự động chạy:

1. ✅ Test & Build Backend
2. ✅ Build Frontend
3. ✅ Deploy lên Render

---

## 📊 Monitor Workflows

### Xem trạng thái:

1. Vào GitHub Repository
2. Click tab **"Actions"**
3. Xem workflow runs

### Logs:

- Click workflow run để xem chi tiết logs
- Kiểm tra các bước execution

---

## 🐛 Troubleshooting

### Workflow không chạy?

- Kiểm tra branch name (phải là `vothuong`)
- Kiểm tra file paths trigger
- Xem Actions logs

### Deploy không thành công?

- Kiểm tra Render webhook secrets
- Xem Render deployment logs
- Kiểm tra environment variables

### Build failed?

- Xem build logs trong Actions
- Kiểm tra dependencies
- Test locally: `go build` / `npm run build`

---

## 💡 Customize Workflows

### Thêm notifications:

```yaml
- name: Notify on Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

### Chạy tests:

```yaml
- name: Run tests
  run: go test ./...
```

### Custom deployment:

```yaml
- name: Deploy to custom server
  run: |
    ssh user@server 'cd app && git pull && restart'
```

---

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Render Deployment API](https://render.com/docs/deploy-webhook)
- [Go CI/CD](https://github.com/golang/go/wiki/Actions)
- [Node.js CI/CD](https://github.com/actions/setup-node)
