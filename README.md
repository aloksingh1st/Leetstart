# 🧠 LeetStart

**LeetStart** is a full-stack coding platform built to understand how **LeetCode** works behind the scenes — from frontend UI to code execution and authentication flow.  
Developed entirely from scratch using **React**, **Express**, **Judge0**, and **TailwindCSS**.

---

## ⚙️ Tech Stack

| Layer | Technology |
| :-- | :-- |
| **Frontend** | React, Vite, Zustand, TailwindCSS |
| **Backend** | Node.js, Express.js, Swagger |
| **Code Execution** | Judge0 REST API |
| **Authentication** | JWT, bcrypt, OAuth (Google/GitHub in progress) |
| **Database** | PostgreSQL |
| **Deployment** | Vercel (Frontend), Render / AWS EC2 (Backend) |

---

## 🎯 Core Features

- 💻 **Real-time Code Execution** — powered by Judge0 REST API  
- 🔐 **User Authentication** — JWT-based; Google/GitHub OAuth coming soon  
- 📚 **Problem Management System** — create, fetch, and solve coding problems  
- ⚙️ **Microservice-Ready Architecture** — separate Auth and Platform services  
- 🥩 **Frontend–Backend Decoupling** — independent deployment pipelines  
- 📈 **Developer-Friendly API Docs** — auto-generated via Swagger  

---

## 🏗️ Project Structure

leetstart/
├── frontend/ # React + TailwindCSS client
└── backend/ # Express + Judge0 + PostgreSQL server



---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/aloksingh1st/leetstart.git
cd leetstart

cd backend
npm install
cp .env.example .env
npm run dev

⚠️ Make sure your .env is configured with PostgreSQL URI, JWT secret, and Judge0 API credentials.


cd ../frontend
npm install
npm run dev



🧩 Environment Variables (Backend)
Variable	Description
DATABASE_URL	PostgreSQL connection string
JWT_SECRET	Secret key for JWT authentication
JUDGE0_URL	Base URL for Judge0 API
PORT	Backend server port


🥪 Development Philosophy

LeetStart isn’t just another LeetCode clone — it’s a technical exploration into:

how online judges safely manage remote code execution

how frontend–backend communication happens asynchronously

how microservices can stay modular yet connected

This project evolves as I deepen my understanding of system design, authentication flows, and developer tooling.

🧰 Future Plans

✅ Complete Google & GitHub OAuth integration

✅ Add discussion threads for each problem

🚧 Implement submission history & test case analytics

🚧 Introduce problem difficulty tagging and leaderboard

🚀 Build SDK for client-side code execution integration

👨‍💻 Author

Alok Singh
Full-Stack Developer | Building Entrix
 & LeetStart

🔗 LinkedIn
 • Twitter
 • Portfolio

📜 License

MIT License © 2025 Alok Singh
