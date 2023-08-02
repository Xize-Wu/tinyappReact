import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

export const userContext = createContext(null)

const UserProvider = props => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await axios.get('sessions/verify', {withCredentials: true})
        if (result.data.success) {
          setUser(result.data?.user);
        }
  
      } catch (e) {
        console.log("User Context Error");
        console.log(e);
      }
    }
    verifyUser();
  }, [])

  return <userContext.Provider value={{user, setUser}}>
    {props.children}
  </userContext.Provider>
}

export default UserProvider;