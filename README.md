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
📦root
├── 📁ml-service # Python ML code
│ ├── predict.py
│ └── student_performance_model.joblib
├── 📁server # Node.js + Express backend
│ ├── 📁src
│ │ ├── 📁controllers
│ │ ├── 📁models
│ │ ├── 📁routes
│ │ └── 📁middlewares
│ └── server.js
├── 📁client # React Frontend (coming soon!)
│ └── src/
├── README.md
</pre>


---

