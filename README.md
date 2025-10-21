🧠 LeetStart

LeetStart is a full-stack coding platform built to understand how LeetCode works behind the scenes — from frontend UI to code execution and authentication flow.Built entirely from scratch using React, Express, Judge0, and TailwindCSS.

⚙️ Tech Stack

Layer

Technology

Frontend

React, Vite, Zustand, TailwindCSS

Backend

Node.js, Express.js, Swagger

Code Execution

Judge0 API

Auth

JWT, bcrypt, OAuth (Google/GitHub planned)

Database

Postgres

Deployment

Vercel (frontend), Render/EC2 (backend)

🎯 Core Features

💻 Real-time code execution via Judge0 REST API

🔐 User authentication (JWT-based; OAuth in progress)

📚 Problem management system (create, fetch, solve problems)

⚙️ Microservice-ready architecture (auth + platform separation)

🥩 Frontend–Backend decoupling for independent deployments

📈 Developer-friendly API docs using Swagger

🏧 Project Structure

leetstart/
├── frontend/   # React + Tailwind client
└── backend/    # Express + Judge0 + database server

🚀 Getting Started

1️⃣ Clone the repository

git clone https://github.com/aloksingh1st/leetstart.git
cd leetstart

2️⃣ Setup Backend

cd backend
npm install
cp .env.example .env
npm run dev

Make sure you’ve configured your .env file with MongoDB URI, JWT secret, and Judge0 API credentials.

3️⃣ Setup Frontend

cd ../frontend
npm install
npm run dev

🤉 Environment Variables (Backend)

Variable

Description

DATABASE_URL

Postress connection string

DATABASE_URL

Secret key for JWT auth

JUDGE0_URL

Base URL for Judge0 API

PORT

Backend server port



🥪 Development Philosophy

LeetStart isn’t just another clone — it’s a technical exploration of:

how online judges manage code execution safely,

how frontend and backend communicate asynchronously,

how microservices can stay modular but connected.

This project evolves as I refine my understanding of system design, auth services, and developer tooling.

🧰 Future Plans



🧑‍💻 Author

Alok SinghFull-Stack Developer | Building Entrix & LeetStartLinkedIn • Twitter • Portfolio

📜 License

MIT License © 2025 Alok Singh

