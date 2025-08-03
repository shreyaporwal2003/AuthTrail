const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios'); // ✅ Required to call Flask AI server

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 MongoDB Connection
mongoose.connect(
  'mongodb+srv://shreyaporwal167:SD5LXdYF2uuXtOtR@cluster0.8mljwgq.mongodb.net/authrail?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// 🧠 Import Mongoose Schema
const UserActivity = require('./models/UserActivity');

// 📥 Route to Save User Behavior Data with AI Prediction
app.post('/api/user-activity', async (req, res) => {
  try {
    const { typingSpeed, clicks, tabSwitches } = req.body;

    // 🔮 Call AI model to classify
    const aiRes = await axios.post("http://localhost:5001/predict", {
      features: [typingSpeed, clicks, tabSwitches]
    });

    const prediction = aiRes.data.result; // 'SAFE' or 'FRAUDULENT'

    // 💾 Save to DB with prediction
    const newActivity = new UserActivity({
      typingSpeed,
      clicks,
      tabSwitches,
      prediction
    });

    await newActivity.save();

    res.send({
      message: 'Activity saved to MongoDB with prediction',
      prediction
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Failed to save activity');
  }
});

// 📤 Route to Get All Activities
app.get('/api/user-activity', async (req, res) => {
  try {
    const activities = await UserActivity.find().sort({ timestamp: -1 });
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Failed to fetch activities');
  }
});

// 🗑️ Route to Delete All Activities
app.delete('/api/user-activity', async (req, res) => {
  try {
    await UserActivity.deleteMany({});
    res.send({ message: '🗑️ All user activities deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Failed to delete activities');
  }
});

// 🌐 Start Server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
