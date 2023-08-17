import { redirect } from "react-router-dom"

const authLoader=()=>{
    const token=localStorage.getItem('token')
    const isLoggedIn=!!token
    if(!isLoggedIn){
        return redirect('/login')
    }
    return ''
}
export default authLoader