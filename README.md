🚨 CivicLens AI – Smart Civic Complaint Management System

CivicLens AI is a web-based intelligent civic complaint platform that helps city authorities prioritize and resolve urban issues efficiently using AI-driven analysis.
Instead of handling complaints randomly, CivicLens AI converts raw citizen complaints into prioritized, actionable urban intelligence using image analysis, duplicate detection, and severity-based scoring.

🌟 Key Highlights

📷 Image-based civic issue reporting
🤖 AI-powered issue classification (Google Gemini)
🔁 Duplicate complaint detection
🔥 Priority scoring engine
🧭 Admin dashboard with live analytics
🗺️ Interactive city map visualization
🔐 Secure Admin Login (JWT Authentication)
🎨 Modern UI using Tailwind CSS
🧠 Problem Statement

Cities receive thousands of civic complaints daily (potholes, garbage, streetlights, etc.).
Most systems:

Treat all complaints equally

Lack prioritization

Overwhelm authorities with unstructured data

👉 CivicLens AI solves this by ranking what needs urgent action first.

🚀 Solution Overview

CivicLens AI uses:

AI image analysis to understand the issue

Duplicate detection to group repeated complaints

Priority scoring based on severity + frequency

Dashboards & maps for data-driven decisions

🏗️ System Architecture
🔹 High-Level Flow
Citizen (Web UI)
     |
     |  Image + Location + Description
     ↓
Frontend (React + Tailwind)
     |
     |  API Requests
     ↓
Backend (Node.js + Express)
     |
     |-- Cloudinary (Image Storage)
     |-- Google Gemini AI (Issue Analysis)
     |-- Duplicate Detection Engine
     |-- Priority Scoring Logic
     ↓
MongoDB (Complaints + Admin Data)
     |
     ↓
Admin Dashboard (JWT Protected)

🧩 Core Features
👤 Citizen Module

Report civic issues with image upload

Provide location details (lat, lng, address)

Simple and transparent UI

🔐 Admin Module

Secure admin login (JWT)

Dashboard with:

Severity statistics

Priority ranking

Complaint table

Status updates:

Reported → In Progress → Resolved

Interactive city map view

🤖 AI Intelligence

Issue type detection (e.g., pothole, garbage)

Severity classification (Low / Medium / High)

Duplicate grouping

Dynamic priority score calculation

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Axios

React Router

Leaflet (Maps)

Backend

Node.js

Express.js

MongoDB (Atlas)

Mongoose

JWT Authentication

Multer (File Upload)

AI & Cloud

Google Gemini API

Cloudinary (Image hosting)

📂 Project Structure
civiclens-ai/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── pages/
│   │   ├── ReportIssue.jsx
│   │   └── admin/
│   ├── components/
│   └── App.jsx
│
├── README.md
└── .gitignore

🔐 Authentication Flow (Admin)

Admin logs in using email & password

Backend verifies credentials using bcrypt

JWT token is generated

Token stored in browser (localStorage)

Protected routes allow access only if token exists

🔌 API Endpoints
Complaints

POST /api/complaints → Submit complaint

GET /api/complaints → Fetch all complaints (Admin)

PATCH /api/complaints/:id/status → Update complaint status

Admin

POST /api/admin/login → Admin login (JWT)

🖼️ Screenshots

📌 Add screenshots after deployment or local testing

Citizen – Report Issue Page

Admin Login

Admin Dashboard

Map View

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/PrashantKumbhar1/civiclens-ai.git
cd civiclens-ai

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Create .env:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
GEMINI_API_KEY=xxxx

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🧪 Demo Credentials (Local)
Admin Email: admin@civiclens.ai
Admin Password: admin123

🎯 Use Cases

Smart cities & municipalities

Urban governance platforms

Civic hackathons

AI-based public service systems

📈 Future Enhancements

Mobile app support

Automatic geolocation

Advanced analytics & charts

Role-based access control

Citizen complaint tracking IDs

🏁 Conclusion

CivicLens AI transforms civic complaints from chaos into clarity.
It empowers authorities with AI-driven insights while keeping the process transparent for citizens.

From random complaints → to prioritized, actionable urban intelligence.