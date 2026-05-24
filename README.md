# BDA Team Management System

A full-stack MERN application developed for managing Business Development Associate (BDA) operations in a manufacturing company. The platform enables lead management, sales tracking, employee workflows, follow-up communication, and role-based dashboards.

---
**Deployed link** - https://bda-module-xi.vercel.app/
---
# Default Admin Credentials

```text
Email: admin@gmail.com
Password: 123456
```

Admin account is automatically seeded during first backend startup.

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM
* Vite

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# Features

## Authentication & Authorization

* JWT-based authentication
* Role-based access control
* Admin and Employee login workflows
* Protected routes

---

## Admin Features

* Create employees
* Assign leads to employees
* View all leads
* Manage company-wide sales pipeline
* Track follow-ups and communications
* Monitor employee performance
* View analytics dashboard

---

## Employee Features

* Login securely
* Create and manage own leads
* Update lead status
* Access personal sales board
* Add follow-ups and communication logs
* Track personal performance metrics

---

# Core Modules

## Lead Management

* Create leads
* Update lead information
* Delete leads
* Assign leads to employees
* Track lead status

### Lead Statuses

* New
* Contacted
* Negotiation
* Converted
* Lost

---

## Sales Board

Drag-and-drop inspired sales workflow for managing leads through different sales stages.

---

## Follow-Up Management

Communication tracking system for:

* Calls
* Emails
* Meetings
* Client discussions

Each lead maintains a communication timeline.

---

## Performance Tracking

### Admin

* Team performance overview
* Revenue tracking
* Lead conversion monitoring

### Employee

* Personal performance dashboard
* Lead statistics
* Conversion metrics
* Revenue generated

---

# Folder Structure

```bash
BDA-module/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Pjdey28/BDA-module.git
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

# API Endpoints

## Authentication

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| POST   | /api/auth/login | User login  |

---

## Leads

| Method | Endpoint       | Description |
| ------ | -------------- | ----------- |
| GET    | /api/leads     | Fetch leads |
| POST   | /api/leads     | Create lead |
| PUT    | /api/leads/:id | Update lead |
| DELETE | /api/leads/:id | Delete lead |

---

## Employees

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /api/users | Fetch employees |
| POST   | /api/users | Create employee |

---

## Follow-Ups

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | /api/followups | Fetch follow-ups |
| POST   | /api/followups | Create follow-up |

---

# Deployment

## Backend Deployment

* Render

## Frontend Deployment

* Vercel

## Database

* MongoDB Atlas

---

# Future Enhancements

* Email notifications
* WhatsApp integration
* File attachments
* Advanced analytics
* Export reports
* Real-time notifications
* Calendar integration
* Activity logs

---

