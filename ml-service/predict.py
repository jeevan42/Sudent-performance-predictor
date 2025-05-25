import sys
import pandas as pd
import joblib
import os

# Get the current script directory (ml-service/)
current_dir = os.path.dirname(__file__)
model_path = os.path.join(current_dir, 'student_performance_model.joblib')

# Load the model
model = joblib.load(model_path)

# Read CLI arguments and predict
features = pd.DataFrame([[float(sys.argv[1]), float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4])]],
                        columns=['Attendance (%)', 'Study Hours per Day', 'Previous Marks (%)', 'Assignment Score'])

result = model.predict(features)[0]
print('Pass' if result == 1 else 'Fail')
