import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        console.log(response.data); // check what comes back
        setJokes(response.data.jokes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // <- run once

  return (
    <>
      <h1>Let's Connect Frontend and Backend</h1>
      <p>JOKES: {jokes.length}</p>
      {jokes.map((joke, index) => (
        <div key={index}>
          <h3>{joke.title ?? `Joke ${index + 1}`}</h3>
          <p>{joke.content ?? joke}</p>
        </div>
      ))}
    </>
  );
}

export default App;
