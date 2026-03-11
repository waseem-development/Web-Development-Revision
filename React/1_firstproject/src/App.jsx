import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <main className="flex gap-4 flex-col items-center mt-10">
      <h1>Hello World</h1>
      <h2 id="screen">{count}</h2>
      <div className="flex gap-4">
        <button id="increment" className="bg-green-500" onClick={increment}>
          +
        </button>
        <button id="decrement" className="bg-blue-500" onClick={decrement}>
          -
        </button>
        <button id="reset" className="bg-red-500" onClick={reset}>
          Reset
        </button>
      </div>
    </main>
  );
}

export default App;
