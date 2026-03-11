import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("rgb(0, 0, 0)");
  const [intervalId, setIntervalId] = useState(null); // store interval ID in state

  // Start changing colors every second
  const changeBG = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        setColor(`rgb(${r}, ${g}, ${b})`);
      }, 1000);
      setIntervalId(id); // store interval ID
    }
  };

  // Stop color changing
  const stopColors = () => {
    clearInterval(intervalId); // stop the interval
    setIntervalId(null); // reset ID so we can start again
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center duration-200"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-white text-2xl mb-6">{color}</h1>
      <div className="flex gap-4">
        <button
          onClick={() => changeBG()}
          className="text-white border-2 border-white rounded px-6 py-3 cursor-pointer hover:bg-white hover:text-black transition"
        >
          Start
        </button>
        <button
          onClick={() => stopColors()}
          className="bg-red-500 text-white px-6 py-3 rounded shadow hover:bg-red-600 transition"
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;
