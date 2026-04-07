# 🎓 Leave Management System — MERN Stack

A complete, professional Leave Management System with a **Student → Teacher → HOD → Principal** hierarchical approval workflow.

---

## 📁 Project Structure

```
leave-management/
├── backend/
│   ├── config/db.js
│   ├── middleware/authMiddleware.js
│   ├── models/User.js
│   ├── models/Leave.js
│   ├── routes/authRoutes.js
│   ├── routes/leaveRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── LeaveForm.jsx
    │   │   ├── LeaveTable.jsx
    │   │   ├── ApprovalCard.jsx
    │   │   └── StatusBadge.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── TeacherDashboard.jsx
    │   │   ├── HodDashboard.jsx
    │   │   └── PrincipalDashboard.jsx
    │   ├── services/api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## ⚡ Quick Setup

### Prerequisites
- Node.js v18+
- npm or yarn

---

### Step 1 — Backend Setup

```bash
cd leave-management/backend
npm install
```

The `.env` file is pre-configured with your MongoDB Atlas URI. You can edit it if needed:

```env
MONGODB_URI=mongodb+srv://jothiniv2_db_user:joo123@cluster0.ptn4sni.mongodb.net/LeaveManagement?appName=Cluster0
JWT_SECRET=leave_management_super_secret_key_2024
PORT=5000
```

Start the backend:

```bash
npm run dev     # with nodemon (auto-restart)
# OR
npm start       # without nodemon
```

Backend will run at: **http://localhost:5000**

---

### Step 2 — Frontend Setup

```bash
cd leave-management/frontend
npm install
npm run dev
```

Frontend will run at: **http://localhost:5173**

---

## 🔑 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| POST | `/api/leaves/apply` | Student | Apply for leave |
| GET | `/api/leaves/my` | Student | Get own leaves |
| GET | `/api/leaves/pending` | Teacher/HOD/Principal | Get pending leaves for role |
| PUT | `/api/leaves/update/:id` | Teacher/HOD/Principal | Approve or reject leave |
| GET | `/api/leaves/all` | Teacher/HOD/Principal | Get all leaves |

---

## 🔄 Approval Workflow

```
Student applies → status: pending      → currentLevel: teacher
Teacher approves → status: teacher_approved → currentLevel: hod
HOD approves    → status: hod_approved      → currentLevel: principal
Principal approves → status: approved   → currentLevel: completed

Any role rejects → status: rejected → currentLevel: completed
```

---

## 🎨 Status Color Codes

| Status | Color |
|--------|-------|
| Pending | 🟡 Yellow |
| Teacher Approved | 🔵 Blue |
| HOD Approved | 🟣 Purple |
| Approved | 🟢 Green |
| Rejected | 🔴 Red |

---

## 👤 Test Accounts

Register these accounts via `/register` to test:

| Role | Email | Password |
|------|-------|----------|
| Student | student@test.com | 123456 |
| Teacher | teacher@test.com | 123456 |
| HOD | hod@test.com | 123456 |
| Principal | principal@test.com | 123456 |

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + React Router + Axios
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas (Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **Notifications**: react-hot-toast

---

## 🚀 Production Build

```bash
# Build frontend
cd frontend
npm run build

# Serve with any static host or integrate with Express
```
