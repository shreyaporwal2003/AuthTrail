# 🚦 AuthRail Behavior Tracker

**AuthRail** is an AI-powered invisible fraud tracker that analyzes user behavior—such as typing speed, clicks, and tab switches—to predict whether user activity is safe or fraudulent in real-time. This tool helps detect suspicious patterns to improve security and prevent fraud.

![Main Interface](Screenshots/Screenshot%202025-08-03%20182459.png)

---

## ✨ Features

✅ Real-time behavior tracking: Typing speed, number of clicks, and tab switches.  
✅ AI-based classification: Predicts SAFE or FRAUDULENT activity based on behavioral data.  
✅ Persistent activity log: Stores user sessions with timestamps for auditing.  
✅ Easy-to-use interface: Submit, load, or delete activity data with one click.  
✅ Modern responsive design built with React.js.

---

## 📸 Screenshots

### Initial View
![Start Typing](Screenshots/Screenshot%202025-08-03%20182459.png)

### Safe Activity Detected
![Safe Prediction](Screenshots/Screenshot%202025-08-03%20182813.png)

### Fraudulent Activity Detected
![Fraudulent Prediction](Screenshots/Screenshot%202025-08-03%20182918.png)

---

## 🛠️ Tech Stack

- **Frontend:** React.js, JavaScript, HTML, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **AI Service:** Python FastAPI server (BERT-based model for classification)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/shreyaporwal2003/AuthTrail.git
cd AuthTrail
```
### 2️⃣ Start the React Frontend
```bash
cd Client
npm install
npm run dev
```
### 3️⃣ Start the Node.js Express Server
```bash
cd ../Server
npm install
node server.js
```
### 4️⃣ Start the Python AI Model API
```bash
cd ../AI-Model
pip install -r requirements.txt
python app.py
```
---
## ✅ Requirements
Node.js & npm
Python 3.8+
MongoDB connection string (already added in server.js)
behavior_model.pkl file in AI-Model folder (train with train_model.py if not available)


