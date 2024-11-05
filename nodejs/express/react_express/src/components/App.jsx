import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  //fetch to /api/login
  useEffect(() => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'admin', password: 'admin' }),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Front End Served!</h1>
    </div>
  );
}

export default App;
