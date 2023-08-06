import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserProvider from "../contexts/user";
import Url from "../components/Url";
import axios from "axios";
//npx sequelize-cli db:drop
export default function Profile (){
    const [urlList, setUrlList] = useState([])
    const load = async () => {
      try {
        const res = await axios.get('http://localhost:8080/my_url')
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
        <UserProvider>
        <span>
            {}
            <Navbar/>
        <div id='profile'>
            
        {
            urlList.length === 0 ? (<>Haiyaa... There are no urls in the database!</>) :
            
              (
                urlList.map((x) => {
                  return <Url key={x.id} 
                              id={x.id}
                              longUrl={x.long_url} 
                              shortUrl= {x.short_url}
                              load = {()=>load()} />
                }))}
        </div>
        </span>
        </UserProvider>
    )
}