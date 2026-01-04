# 🏙️ CivicLens AI  
### AI-Powered Civic Issue Reporting & Analytics Platform

CivicLens AI is a web-based intelligent civic complaint platform that helps city authorities prioritize and resolve urban issues efficiently using AI-driven analysis.
Instead of handling complaints randomly, CivicLens AI converts raw citizen complaints into prioritized, actionable urban intelligence using image analysis, duplicate detection, and severity-based scoring.

## 🚀 Live Demo

- **Frontend (Netlify):** https://civiclens-ai1.netlify.app/ 
- **Backend (Render):** https://civiclens-ai.onrender.com  

---

## 📌 Problem Statement

Traditional civic complaint systems suffer from:
- Manual and slow processing
- Duplicate complaints
- No severity or priority classification
- Lack of location visualization
- No analytics for authorities

Municipal bodies need a **data-driven, AI-assisted system** to manage civic issues efficiently.

---

## 💡 Solution – CivicLens AI

CivicLens AI solves these problems by:
- Allowing citizens to report issues with images & map location
- Using **Google Gemini AI** to analyze complaints
- Automatically classifying **issue type & severity**
- Calculating **priority scores**
- Detecting **duplicate complaints**
- Providing admins with **dashboards, maps, and analytics**

---

## 🧠 Key Features

### 👤 Citizen Side
- Report civic issues easily
- Upload or capture images
- Select exact issue location using map
- Provide contact details (name & mobile)
- Clean, mobile-friendly UI

### 🛡️ Admin Side
- Secure admin login (JWT authentication)
- Centralized dashboard
- Priority-based complaint listing
- Interactive map view
- AI severity & summary display
- Analytics & charts

---

## 🧩 System Architecture 🏗️

User Browser
↓
React + Vite + Tailwind (Frontend)
↓
Node.js + Express (Backend API)
↓
MongoDB Atlas (Database)
↓
Cloudinary (Image Storage)
↓
Google Gemini AI (Issue Analysis)

---

## 📂 Project Structure

CIVICLENS-AI
│
├── backend
│   ├── src
│   │   ├── config
│   │   │   └── cloudinary.js
│   │   │
│   │   ├── controllers
│   │   │   ├── adminAuthController.js
│   │   │   └── complaintController.js
│   │   │
│   │   ├── middleware
│   │   │   └── upload.js
│   │   │
│   │   ├── models
│   │   │   ├── Admin.js
│   │   │   └── Complaint.js
│   │   │
│   │   ├── routes
│   │   │   ├── adminAuthRoutes.js
│   │   │   └── complaintRoutes.js
│   │   │
│   │   ├── scripts
│   │   │   └── createAdmin.js
│   │   │
│   │   ├── services
│   │   │   ├── geminiService.js
│   │   │   ├── adminSummaryService.js
│   │   │   ├── duplicateDetector.js
│   │   │   └── severityAnalyzer.js
│   │   │
│   │   ├── utils
│   │   │   └── priorityCalculator.js
│   │   │
│   │   └── server.js
│   │
│   ├── uploads
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   ├── public
│   │   └── vite.svg
│   │
│   ├── src
│   │   ├── assets
│   │   │
│   │   ├── components
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminNavbar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── MapPicker.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ThemeToggle.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminAnalytics.jsx
│   │   │   │   ├── AdminMap.jsx
│   │   │   │   └── AdminLogin.jsx
│   │   │   │
│   │   │   ├── Home.jsx
│   │   │   └── ReportIssue.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   │
│   ├── dist
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


### 📌 Folder Explanation

#### Backend
- **controllers/** – Handles business logic (authentication, complaints, AI processing)
- **models/** – MongoDB schemas (Admin, Complaint)
- **routes/** – API routes for admin authentication and complaint handling
- **services/** – AI services using Google Gemini for:
  - Issue classification
  - Severity analysis
  - Duplicate detection
  - City-level AI summaries
- **middleware/** – Multer image upload handling
- **scripts/** – One-time admin creation script
- **server.js** – Entry point of backend API

#### Frontend
- **components/** – Reusable UI components (Navbar, MapPicker, Admin Layout, Theme Toggle)
- **pages/**
  - **Home.jsx** – Landing page
  - **ReportIssue.jsx** – Citizen complaint submission form
  - **admin/** – Admin dashboard pages (Analytics, Map, Login)
- **ProtectedRoute.jsx** – JWT-based route protection
- **ThemeToggle.jsx** – Dark / Light mode support


## 🛠️ Technology Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router
- Leaflet.js (Maps)
- Chart.js / react-chartjs-2

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer (file uploads)
- REST APIs

### AI & Cloud
- Google Gemini AI
- Cloudinary
- MongoDB Atlas

### Deployment
- Frontend: **Netlify**
- Backend: **Render**

---

## 🧠 AI Integration (Google Gemini)

### Why Gemini?
Gemini is used where human analysis is slow or inconsistent.

### AI Use Cases
- Issue type detection (Pothole, Garbage, Traffic, etc.)
- Severity classification (High / Medium / Low)
- AI summary generation for admins
- Input to priority calculation

> AI is integrated meaningfully, not forcefully.

---

## 🔢 Priority & Duplicate Detection

### Duplicate Detection
- Same issue type
- Nearby location
- Grouped using `duplicateGroupId`

### Priority Score
Calculated using:
- AI severity
- Number of duplicate reports
- Report frequency

This ensures urgent issues are handled first.

---

## 📊 Admin Dashboard

### Dashboard
- Total complaints
- Severity distribution
- Priority-sorted listing

### 🗺️ Admin Map
- Interactive map with markers
- Popup shows:
  - Issue type
  - Severity
  - Priority score
  - Status

### 📈 Analytics
- Pie chart: complaints by severity
- Bar chart: complaints by issue type
- Data-driven planning for authorities

---

## 🔐 Security

- JWT-based authentication
- Protected admin routes
- Environment-based secrets
- Secure cloud storage
- No sensitive data exposed to frontend

---

## ⚙️ Environment Variables

### Backend (`Render` or `.env`)
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_key

---

1️⃣ Clone Repository
```bash
git clone https://github.com/PrashantKumbhar1/civiclens-ai.git
cd civiclens-ai

2️⃣ Backend Setup
cd backend
npm install
npm run dev

Backend runs on:
http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173


🚀 Deployment

Backend (Render)

Create Web Service
Connect GitHub repo
Root directory: backend

Start command:
npm start


Frontend (Netlify)

Connect GitHub repo
Base directory: frontend

Build command:
npm run build

Publish directory:
dist

🚧 Challenges Faced

File upload + AI processing
Cloudinary misconfiguration
Gemini API model compatibility
Map integration with React
Deployment environment issues


✅ Solutions Implemented

Multer + Cloudinary integration
Safe AI error handling
Modular backend architecture
Environment-based configuration
Fallback logic for AI failures


🔮 Future Enhancements

* Real-time complaint updates
* Mobile application
* Predictive analytics
* Authority notifications
* Multilingual support
* Role-based admin access


🏆 Why CivicLens AI?

✅ Real-world civic problem
✅ AI-powered insights
✅ Scalable cloud architecture
✅ Modern UI/UX
✅ Hackathon-ready innovation

📄 License
This project is developed for educational and hackathon purposes.

🙏 Acknowledgements

Google Gemini AI
MongoDB Atlas
Cloudinary
OpenStreetMap
React & Node.js community


📬 Contact
Developer: Prashant Kumbhar
GitHub: https://github.com/PrashantKumbhar1


