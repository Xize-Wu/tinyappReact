import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Url from './components/Url'

function App() {
  // const test = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/test', { earl_grey: false })
  //     console.log(response)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  const [urlList, setUrlList] = useState([])
  const load = async () => {
    try {
      const res = await axios.get('http://localhost:8080/all_urls')

      console.log(res.data[1])

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
      <div className='container'>
        {console.log('this is url list', urlList)}
        {
          urlList.length === 0 ? (<>Loading...</>) :
          
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