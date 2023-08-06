import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

import Navbar from './components/Navbar/'
import UserProvider from './contexts/user'
import PublicUrl from './components/PublicUrl'
axios.defaults.baseURL = 'http://localhost:8080'


function App() {

  const [urlList, setUrlList] = useState([])
  const load = async () => {
    try {
      const res = await axios.get('http://localhost:8080/all_urls')
      setUrlList(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <UserProvider>
        <Navbar/>
        <button>Create Url</button>
        <div className='container'>
          {
            urlList.length === 0 ? (<>Haiyaa... There are no urls in the database!</>) :
            
              (
                urlList.map((x) => {
                  return <PublicUrl key={x.id} 
                              id={x.id}
                              longUrl={x.long_url} 
                              shortUrl= {x.short_url}
                              load = {()=>load()} />
                })
              )
          }
        </div>
      </UserProvider>
    </>
  )
}

export default App