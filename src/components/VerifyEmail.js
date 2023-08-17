import React from 'react'
import {Button} from 'react-bootstrap'

const VerifyEmail = () => {
    const token=localStorage.getItem('token')
    const verifyEmailHandler=async()=>{
        const input={
            requestType:'VERIFY_EMAIL',    
            idToken:token
        }
        try{
            const response =await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBbfM-Y6Bv3aSPRNlB9S7qZFxVHuvF--l8',{
                method:'POST',
                body:JSON.stringify(input)
            })
            const data=await response.json()
            console.log(data)
        }
        catch(error){
            alert(error.message)
            console.log(error)
        }
      }
  return (
    <div className="text-center"><Button className="mt-5"
    variant="dark"
    onClick={verifyEmailHandler}>
    Verify Email
  </Button></div>
  )
}

export default VerifyEmail