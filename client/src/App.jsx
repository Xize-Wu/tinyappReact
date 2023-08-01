import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Url from './components/Url'

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
      <button>Create Url</button>
      <div className='container'>
        {
          urlList.length === 0 ? (<>Haiyaa... There are no urls in the database!</>) :
          
            (
              urlList.map((x) => {
                return <Url key={x.id} longUrl={x.long_url} shortUrl= {x.short_url} />
              })
            )
        }
      </div>

    </>

  )
}

export default App