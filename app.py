from flask import Flask, render_template, request
import pandas as pd
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load('student_performance_model.joblib')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form data
        attendance = float(request.form['attendance'])
        study_hours = float(request.form['study_hours'])
        previous_marks = float(request.form['previous_marks'])
        assignment_score = float(request.form['assignment_score'])

        # Prepare data as DataFrame with correct column names
        sample = pd.DataFrame([[attendance, study_hours, previous_marks, assignment_score]], columns=['Attendance (%)', 'Study Hours per Day', 'Previous Marks (%)', 'Assignment Score'])

        # Predict
        prediction = model.predict(sample)[0]
        result = "Pass" if prediction == 1 else "Fail"

        return render_template('index.html', prediction_text=f"The student is predicted to: {result}")
    except Exception as e:
        return render_template('index.html', prediction_text=f"Error: {str(e)}")

if __name__ == "__main__":
    app.run(debug=True)
