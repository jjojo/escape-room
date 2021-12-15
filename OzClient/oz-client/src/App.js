import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const ENDPOINT = "http://localhost:3333";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("chat message", (data) => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          It's <time dateTime={response.message}>{response.message}</time>
        </p>
      </header>
    </div>
  );
}

export default App;
