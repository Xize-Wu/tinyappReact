import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const test = async () => {
    try {
      const response = await axios.post('http://localhost:8080/test', { earl_grey: false })
      console.log(response)
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <button onClick={() => test()}>Test</button>
  )
}

export default App