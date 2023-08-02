import { createContext, useContext, useEffect, useState } from "react"

export const userContext = createContext(null)

const UserProvider = props => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    console.log("useEffect");
  }, [])

  return <userContext.Provider value={{user, setUser}}>
    {props.children}
  </userContext.Provider>
}

export default UserProvider;