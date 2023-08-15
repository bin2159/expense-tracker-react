import { createContext } from "react"


const Auth =createContext()
export default Auth

const AuthProvider=({children})=>{
    const auth={
        token:tokenId,
        addTokenId:addTokenIdHandler
    }
    return <AuthProvider>{children}</AuthProvider>
}