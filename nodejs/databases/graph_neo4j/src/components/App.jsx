import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  const [backendData, setBackendData] = useState("")

  //fetch to /login
  useEffect(() => {
    const talkToBackend = async () => {
      //Add /api prefix during development to trigger the Vite proxy
      const response = await fetch("/talk-to-backend");
      console.log(response);
      const data = await response.text();
      setBackendData(data);
    };
    talkToBackend();
  }, []);

  return (
    <div>
      <h1>Front End Served!</h1>
      <h3>{backendData}</h3>
    </div>
  );
}

export default App;
