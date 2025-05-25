import sys
import pandas as pd
import joblib

model = joblib.load('ml/student_performance_model.joblib')
features = pd.DataFrame([[float(sys.argv[1]), float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4])]],
                        columns=['Attendance (%)', 'Study Hours per Day', 'Previous Marks (%)', 'Assignment Score'])
result = model.predict(features)[0]
print('Pass' if result == 1 else 'Fail')
