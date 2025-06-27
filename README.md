# 🧠 AI Proctoring Exam System

An AI-powered online exam platform built using **React**, **Node.js**, and **TensorFlow.js** to detect cheating behavior in real-time during exams. It includes an admin dashboard for managing exams and uses machine learning for live face tracking and head pose estimation.

## 🚀 Features

- 🎥 **AI Monitoring** using TensorFlow.js
  - Detects multiple faces
  - Head pose detection (left, right, down)
  - Sends real-time alerts
  - Automatically disqualifies on repeated violations

- 👨‍💻 **Admin Dashboard**
  - Create, edit, delete exams
  - Manage exam sessions

- 👨‍🎓 **Student View**
  - Join exams securely
  - Live camera tracking and alerts

## 🛠️ Tech Stack

| Frontend      | Backend     | AI/ML               | Others               |
|---------------|-------------|---------------------|----------------------|
| React.js      | Node.js     | TensorFlow.js       | Express.js, MongoDB  |
| Tailwind CSS  | MongoDB     | Face & head tracking| Socket.io, JWT       |

## 📸 Screenshots

| Student Interface | Admin Panel |
|-------------------|-------------|
| ![Student](student-view.png) | ![Admin](admin-panel.png) |

## 📂 Folder Structure

```bash
AI-Proctoring/
├── client/                 # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       └── App.jsx
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env
└── README.md
