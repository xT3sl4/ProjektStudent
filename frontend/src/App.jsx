import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Błąd:", error));
  }, []);

  return <h1>{message || "Ładowanie..."}</h1>;
}

export default App;
