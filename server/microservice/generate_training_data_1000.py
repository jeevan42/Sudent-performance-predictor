import pandas as pd
import random

def generate_result(att, hrs, marks, assign):
    score = (att * 0.25) + (hrs * 15) + (marks * 0.25) + (assign * 2)
    return "Pass" if score > 100 else "Fail"

data = []
for _ in range(1000):
    att = random.randint(40, 100)
    hrs = round(random.uniform(0.5, 5), 1)
    marks = random.randint(35, 100)
    assign = random.randint(4, 10)
    result = generate_result(att, hrs, marks, assign)
    data.append([att, hrs, marks, assign, result])

df = pd.DataFrame(data, columns=[
    "Attendance (%)",
    "Study Hours per Day",
    "Previous Marks (%)",
    "Assignment Score",
    "Result"
])

df.to_csv("./microservice/student_performance_dataset.csv", index=False)
print("✅ Generated dataset with 1000 rows.")
