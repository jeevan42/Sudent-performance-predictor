import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("student_performance_dataset.csv")

# Convert Result column to binary
df['Result'] = df['Result'].map({'Pass': 1, 'Fail': 0})

# Feature and target split
X = df.drop('Result', axis=1)
y = df['Result']

# Split data into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Sample prediction as DataFrame with proper column names
sample = pd.DataFrame([[70, 2, 60, 6]], columns=X.columns)

result = model.predict(sample)[0]
print("Prediction for sample student:", "Pass" if result == 1 else "Fail")
