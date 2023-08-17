import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRef, useState } from 'react';

const ForgotPassword = () => {
    const [loading,setLoading]=useState(false)
    const emailRef=useRef()
    const sendResetEmailHandler=async()=>{
        setLoading(true)
        const req={
            email:emailRef.current.value,
            requestType:'PASSWORD_RESET'
        }
        try{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBbfM-Y6Bv3aSPRNlB9S7qZFxVHuvF--l8',{method:'POST',body:JSON.stringify(req)})
            const data=await response.json()
            console.log(data)
        }
        catch(error){
             console.log(error)
        }
        setLoading(false)
    }
  return (
    <Form>
         <Card style={{ width: '30rem' }} className='mx-auto mt-5'>
      <Card.Body>
        <Card.Title>Reset Password</Card.Title>
        <Card.Subtitle className="mb-2 text-muted mt-3">Enter the email with which you have registered</Card.Subtitle>
        <Card.Text>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
      <Form.Control type="email" ref={emailRef}/>
    </Form.Group>
        </Card.Text>
        <Button variant='dark' onClick={sendResetEmailHandler}>{!loading?'Send Link':'Sending'}</Button>
      </Card.Body>
    </Card>
    
  </Form>
  )
}

export default ForgotPassword