import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // ---------------- STATE ----------------
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  // ---------------- PASSWORD GENERATOR ----------------
  const generatePassword = () => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numbersAllowed) str += "0123456789"; // fixed typo
    if (symbolsAllowed) str += "!@#$%^&*";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  };

  // Auto-generate password when options change
  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, symbolsAllowed]);

  // Example API call (runs once)
  useEffect(() => {
    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      });

    return () => controller.abort(); // cleanup
  }, []);

  // Example interval (runs once)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Hello");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ---------------- COPY FUNCTION ----------------
  const copyPasswordToClipboard = () => {
    if (!passwordRef.current) return;

    passwordRef.current.select();
    navigator.clipboard
      .writeText(passwordRef.current.value)
      .then(() => alert("Password copied to clipboard!"))
      .catch(() => alert("Clipboard permission denied"));
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col gap-4 p-6 bg-gray-800 w-1/2 max-w-lg rounded-lg shadow-lg text-white">
        <h1 className="text-2xl font-bold text-center">Password Generator</h1>

        {/* Password Output + Copy Button */}
        <div className="flex">
          <input
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
            className="w-full p-2 rounded bg-gray-900 text-white text-center"
          />
          <button
            className="bg-gray-700 hover:bg-gray-600 px-4 rounded"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        {/* Length */}
        <div className="flex items-center justify-between">
          <label className="text-sm">Length: ({length})</label>
          <input
            type="range"
            min="6"
            max="100"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-2/3 cursor-pointer"
          />
        </div>

        {/* Options */}
        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={symbolsAllowed}
              onChange={() => setSymbolsAllowed((prev) => !prev)}
            />
            Symbols
          </label>
        </div>

        {/* Generate Button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 transition rounded py-2 font-semibold"
          onClick={generatePassword}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;