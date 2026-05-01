# 🚀 Lead Management System (Mini CRM)

A simple full-stack Lead Management System built using React, Node.js, and PostgreSQL (Neon). This project allows users to manage leads efficiently with basic CRUD operations and a clean dashboard interface.

---

## 🧠 Tech Stack

**Frontend**

* React (Vite)
* Axios
* Tailwind CSS (UI styling)

**Backend**

* Node.js
* Express.js

**Database**

* PostgreSQL (via Neon)

---

## ✨ Features

* ➕ Add new leads (Name, Phone, Source)
* 📋 View all leads
* 🔄 Update lead status (Interested / Not Interested / Converted)
* ❌ Delete leads
* 🔍 Search leads (by name or phone)
* 🎯 Filter leads by status
* 📊 Dashboard stats:

  * Total Leads
  * Converted Leads
  * Interested
  * Not Interested

---

## 🗄️ Database (Neon)

This project uses **Neon (serverless PostgreSQL)** for database hosting.

### Table Schema:

```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  source VARCHAR(20),
  status VARCHAR(20) DEFAULT 'Interested',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔗 API Endpoints

| Method | Endpoint   | Description        |
| ------ | ---------- | ------------------ |
| POST   | /leads     | Add new lead       |
| GET    | /leads     | Get all leads      |
| PUT    | /leads/:id | Update lead status |
| DELETE | /leads/:id | Delete lead        |

---

## 🚀 Future Improvements

* Authentication (JWT / OAuth)
* Pagination for large data
* Better UI animations

---

