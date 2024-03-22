import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  // Fetch all todos
  useEffect(() => {
    const response = axios.get('http://localhost:8000/todos/')
    .then(response => {
        setTodos(response.data)
    })

  }, [])
  

  return (
    <>
      
    </>
  )
}

export default App
