# Task Manager App

A simple full-stack Task Manager built using React, Node.js, Express, and PostgreSQL (Neon).

---

##  Setup Instructions

### 1. Clone the repo
git clone 
cd 1-play-sports-assignment


### 2. Backend Setup
cd server
npm install


Create `.env`:
PORT=5000

DATABASE_URL= shared with the mail

Command to run backend - npm run dev

### 3. Database Setup

- Open your Neon project dashboard  
- Navigate to **SQL Editor**  
- Copy and execute the contents of `server/db/schema.sql`  

### 3. Frontend Setup
cd ../client
npm install
npm i axios
npm run dev


## 📂 Folder Structure

1-play-sports-assignment/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # UI components (TaskItem, TaskForm, etc.)
│ │ ├── api/ # Axios API config
│ │ ├── App.jsx
│ │ └── styles.css
│ ├── index.html
│ └── package.json
│
├── server/ # Node backend
│ ├── config/ # DB config
│ ├── controllers/ # Business logic
│ ├── models/ # DB queries
│ ├── routes/ # API routes
│ ├── middleware/
│ ├── db/schema.sql # DB schema
│ ├── server.js
│ └── package.json
|___README.md

---

## ⚠️ Assumptions & Trade-offs

- No authentication (single-user app)
- Focused on functionality over advanced UI
- Pagination implemented using limit & offset

---

## 🚧 Improvements (With More Time)

- Add authentication (JWT)
- Better UI (Tailwind / component library)
- Add tests (unit + integration)
