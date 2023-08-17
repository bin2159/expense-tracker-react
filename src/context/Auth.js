import { createContext, useState } from "react"



const Auth =createContext()
export default Auth

export const AuthProvider=({children})=>{
    const storageToken=localStorage.getItem('token')
    const [tokenId,setTokenId]=useState(storageToken)
    const addTokenIdHandler=(token)=>{
        localStorage.setItem('token',token)
        setTokenId(token)
    }
    const userIsLoggedIn=!!tokenId
    const removeTokenHandler=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('')
        setTokenId(null)
    }
    const auth={
        token:tokenId,
        isLoggedIn:userIsLoggedIn,
        addToken:addTokenIdHandler,
        removeToken:removeTokenHandler
    }
    return <Auth.Provider value={{auth}}>{children}</Auth.Provider>
}