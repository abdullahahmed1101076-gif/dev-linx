# 🚀 DockerOps Full-Stack App (React + Node + MongoDB)

A full-stack web application built with **React (Vite)** frontend, **Node.js/Express** backend, and **MongoDB**, fully containerized using Docker with CI/CD automation via GitHub Actions.

---

# 📦 Tech Stack

- Frontend: React + Vite + Nginx
- Backend: Node.js + Express
- Database: MongoDB
- Containerization: Docker & Docker Compose
- CI/CD: GitHub Actions
- Reverse Proxy: Nginx

---

# 📁 Project Structure


project-root/
├── frontend/
│ ├── src/
│ ├── nginx.conf
│ ├── Dockerfile
│ └── package.json
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── Dockerfile
│ └── package.json
│
├── docker-compose.yml
└── .github/workflows/


---

# 🚀 Features

- Full CRUD API (Create, Read, Update, Delete)
- React frontend with API integration
- MongoDB database integration
- Dockerized services (frontend, backend, database)
- Nginx reverse proxy for SPA routing
- CI/CD pipeline with GitHub Actions
- Auto deployment to server via SSH

---

# ⚙️ Setup Instructions

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
2. Run with Docker Compose
docker compose up --build
3. Access the app
Service	URL
Frontend	http://localhost:3000

Backend	http://localhost:5000

MongoDB	mongodb://localhost:27017
🔌 Environment Variables

Create a .env file in backend:

PORT=5000
MONGO_URI=mongodb://mongo:27017/appdb
🐳 Docker Services
Backend Dockerfile

Runs Node.js API server

Frontend Dockerfile

Builds React app and serves via Nginx

MongoDB

Official MongoDB image

⚡ CI/CD Pipeline

On every push to main:

Build frontend & backend
Run Docker build
Deploy to remote server via SSH

GitHub Actions workflow:

.github/workflows/deploy.yml
🚀 Deployment Flow
GitHub Push
   ↓
GitHub Actions
   ↓
SSH into Server
   ↓
git pull
   ↓
docker compose up --build
   ↓
Live Application Updated
🛠️ Common Issues
❌ Module not found

✔ Check file paths & case sensitivity

❌ Docker build fails

✔ Ensure package.json + lock files exist

❌ API not working in frontend

✔ Use backend service name (NOT localhost)

📈 Future Improvements
Kubernetes deployment
CI/CD with Docker Hub / GHCR images
HTTPS (Let's Encrypt)
Load balancing with Nginx
Monitoring (Prometheus + Grafana)
👨‍💻 Author

Abdullah Ahmed
