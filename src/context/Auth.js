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
    const auth={
        token:tokenId,
        addTokenId:addTokenIdHandler
    }
    return <Auth.Provider value={{auth}}>{children}</Auth.Provider>
}