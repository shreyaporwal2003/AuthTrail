import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
import joblib

# 🔥 Expanded and improved data with more realistic variation:
# Format: [typingSpeed, clicks, tabSwitches]
X = np.array([
    [3.5, 12, 1],   # Safe
    [1.0, 40, 6],   # Fraud
    [2.8, 9, 0],    # Safe
    [0.5, 60, 10],  # Fraud
    [3.2, 15, 2],   # Safe
    [3.0, 5, 4],    # Fraud
    [2.5, 8, 5],    # Fraud
    [3.4, 10, 1],   # Safe
    [4.0, 12, 0],   # Safe
    [0.8, 50, 8],   # Fraud
    [3.3, 20, 0],   # Safe
    [2.0, 30, 7],   # Fraud
    [3.6, 14, 1],   # Safe
    [1.2, 45, 5],   # Fraud
    [3.1, 11, 1],   # Safe
    [0.9, 55, 9],   # Fraud
])
y = [0, 1, 0, 1, 0, 1, 1, 0,
     0, 1, 0, 1, 0, 1, 0, 1]  # 1=FRAUD, 0=SAFE

# 🔎 Train-test split for evaluation (optional but good practice)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ✅ Improved RandomForest settings
model = RandomForestClassifier(
    n_estimators=200,      # more trees → better stability
    max_depth=10,          # prevent overfitting
    class_weight='balanced',  # adjust for class imbalance
    random_state=42
)
model.fit(X_train, y_train)

# 📊 Evaluate with cross-validation
scores = cross_val_score(model, X_train, y_train, cv=5)
print(f"✅ Cross-validation accuracy: {np.mean(scores):.2f} ± {np.std(scores):.2f}")

# 🔍 Test accuracy
test_accuracy = model.score(X_test, y_test)
print(f"✅ Test set accuracy: {test_accuracy:.2f}")

# 💾 Save the trained model
joblib.dump(model, 'behavior_model.pkl')
print("✅ Model trained and saved as behavior_model.pkl")
