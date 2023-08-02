import './App.css'
import axios from 'axios'
import Navbar from './components/Navbar/'
import UserProvider from './contexts/user'
axios.defaults.baseURL = 'http://localhost:8080'


function App() {
  const test = async () => {
    try {
      const response = await axios.post('/test', { earl_grey: false })
      console.log(response)
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <UserProvider>
        <Navbar/>
        <button onClick={() => test()}>Test</button>
      </UserProvider>
    </>
  )
}

export default App