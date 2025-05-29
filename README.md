# 🧠 Student Performance Predictor App

An end-to-end MERN + Machine Learning project where teachers can manage student records and predict their performance (Pass/Fail) based on inputs like attendance, study hours, previous marks, etc.

---

## 🚀 Tech Stack

### 🔧 Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication

### 🤖 ML Microservice
- Python
- Pandas, Scikit-learn
- Joblib

### 💻 Frontend
- React.js
- Axios
- Tailwind
- Material UI
- React Router DOM, Formik + Yup, Toastify

---

## 📦 Features

- ✅ Teacher Register/Login
- ✅ Add Students with data
- ✅ Predict student result via ML
- ✅ Store prediction history
- ✅ Update student data
- ✅ View single student & their predictions

---

## 🧮 ML Model

- Trained with Logistic Regression on:
  - Attendance (%)
  - Study Hours per Day
  - Previous Marks (%)
  - Assignment Score

- Output: `Pass` or `Fail`

- Microservice built in Python, integrated via `child_process.spawn` in Node.js

---

## 📁 Project Structure
<pre>
📦 root
├── 📁 server                           # Backend + ML Microservice
│   ├── 📁 microservice                 # Python ML code
│   │   ├── generate_training_data_1000.py
│   │   ├── predict.py
│   │   ├── student_performance_dataset.csv
│   │   ├── student_performance_model.joblib
│   │   └── train_model.py
│   ├── 📁 src                          # Node.js + Express backend
│   │   ├── 📁 controllers
│   │   ├── 📁 middlewares
│   │   ├── 📁 models
│   │   └── 📁 routes
│   ├── .env.example
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js

├── 📁 client                          # React.js Frontend
│   ├── 📁 public
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   ├── 📁 pages
│   │   │   ├── 📁 Auth
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   ├── AddStudentForm.jsx
│   │   │   ├── EditStudentForm.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Header.jsx
│   │   │   └── StudentDetails.jsx
│   │   ├── 📁 services
│   │   │   ├── api.js
│   │   │   └── toastNotifications.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── constants.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── routes.jsx
│   ├── .env
│   ├── .gitignore
│   ├── README.md
│   └── eslint.config.js

├── README.md

</pre>

---

