import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(0);
  const startTime = useRef(null);
  const clickCount = useRef(0);
  const tabSwitchCount = useRef(0);
  const [activities, setActivities] = useState([]);
  const [aiPrediction, setAiPrediction] = useState("");

  const fetchActivities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user-activity");
      setActivities(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch activities");
    }
  };

  useEffect(() => {
    const handleClick = () => {
      clickCount.current += 1;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCount.current += 1;
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;
    setText(input);

    if (!startTime.current) {
      startTime.current = Date.now();
    }

    const elapsed = (Date.now() - startTime.current) / 1000;
    const charsTyped = input.length;
    const speed = charsTyped / elapsed;
    setTypingSpeed(speed.toFixed(2));
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all activity data?"))
      return;

    try {
      const res = await axios.delete("http://localhost:5000/api/user-activity");
      alert(res.data.message);
      setActivities([]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete activities");
    }
  };

  const handleSubmit = async () => {
    const payload = {
      typingSpeed: parseFloat(typingSpeed),
      clicks: clickCount.current,
      tabSwitches: tabSwitchCount.current,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user-activity",
        payload
      );
      alert("Data sent: " + res.data.message);

      const aiRes = await axios.post("http://localhost:5001/predict", {
        features: [payload.typingSpeed, payload.clicks, payload.tabSwitches],
      });

      setAiPrediction(aiRes.data.result);
      fetchActivities(); // Refresh table after submission
    } catch (err) {
      console.error(err);
      alert("Error sending data or predicting");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          AuthRail Behavior Tracker
        </h1>

        <textarea
          rows="4"
          cols="50"
          value={text}
          onChange={handleChange}
          placeholder="Start typing..."
          className="border p-2 w-full"
        />
        <p className="mt-2 text-center">
          Typing Speed: {typingSpeed} chars/sec
        </p>

        {aiPrediction && (
          <p
            className={`mt-2 text-center font-bold ${
              aiPrediction === "FRAUDULENT" ? "text-red-600" : "text-green-600"
            }`}
          >
            AI Prediction: {aiPrediction}
          </p>
        )}

        <div className="flex justify-center mt-4 space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit Behavior Data
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={fetchActivities}
          >
            Load Stored Activities
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDeleteAll}
          >
            Delete All Activities
          </button>
        </div>

        {activities.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border border-gray-400">
              <thead className="bg-gray-200">
                <tr className="text-center border border-gray-400">
                  <th className="p-2 border border-gray-400">Typing Speed</th>
                  <th className="p-2 border border-gray-400">Clicks</th>
                  <th className="p-2 border border-gray-400">Tab Switches</th>
                  <th className="p-2 border border-gray-400">Prediction</th>
                  <th className="p-2 border border-gray-400">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act, index) => (
                  <tr
                    key={index}
                    className="text-center border border-gray-400"
                  >
                    <td className="p-2 border border-gray-400">
                      {act.typingSpeed}
                    </td>
                    <td className="p-2 border border-gray-400">{act.clicks}</td>
                    <td className="p-2 border border-gray-400">
                      {act.tabSwitches}
                    </td>
                    <td
                      className={`p-2 border border-gray-400 font-bold ${
                        act.prediction === "FRAUDULENT"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {act.prediction || "N/A"}
                    </td>
                    <td className="p-2 border border-gray-400">
                      {new Date(act.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
