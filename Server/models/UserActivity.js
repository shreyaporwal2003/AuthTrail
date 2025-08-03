const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  typingSpeed: Number,
  clicks: Number,
  tabSwitches: Number,
  prediction: String, 
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserActivity', activitySchema);

const handleSubmit = async () => {
  const payload = {
    typingSpeed: parseFloat(typingSpeed),
    clicks: clickCount.current,
    tabSwitches: tabSwitchCount.current,
  };

  try {
    const res = await axios.post('http://localhost:5000/api/user-activity', payload);
    alert('Data saved: ' + res.data.message);

    // Call AI API for classification
    const aiRes = await axios.post('http://localhost:5001/predict', {
      features: [payload.typingSpeed, payload.clicks, payload.tabSwitches],
    });
    alert(`AI Prediction: ${aiRes.data.result}`);
  } catch (err) {
    console.error(err);
    alert('Error sending data');
  }
};

