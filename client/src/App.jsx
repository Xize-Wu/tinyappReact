import './App.css'
import axios from 'axios'

function App() {
  const test = async () => {
    try {
      const response = await axios.post('http://localhost:8080/test', { earl_grey: false })
      console.log(response)
    }
    catch (err) {
      console.log(err)
    }
  }

  const load = async () =>{
    try{
      const res = await axios.get('http://localhost:8080/all_urls')
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
  }
  
  load()
  
  return (
    <button onClick={() => test()}>Test</button>

  )
}

export default App