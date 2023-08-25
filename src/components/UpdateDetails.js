import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";

const UpdateDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [updated,setUpdated]=useState(false)
  const [editForm,setEditForm]=useState(false)
  const [data,setData]=useState({name:'',email:'',url:''})
  const token=localStorage.getItem('token')
  const showFormHandler = () => {
    setShowForm((prev) => !prev);
  };
  const formSubmitHandler = async () => {
    const input = {
      idToken: token,
      displayName: data.name,
      photoUrl: data.url,
      deleteAttribute: [],
      returnSecureToken: true,
    };
    if(editForm){
        input.email=data.email 
    }
    
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBbfM-Y6Bv3aSPRNlB9S7qZFxVHuvF--l8",
        {
          method: "POST",
          body: JSON.stringify(input),
          headers: { "Content-Type": "application/json" },  
        }
      );
        const data = await response.json();
        
      const data1=await getResponse()
      console.log(data1)
      setEditForm(true)
      setData(prev=>({...prev,email:data1.users[0].email}))
      setData(prev=>({...prev,name:data1.users[0].displayName}))
      setData(prev=>({...prev,url:data1.users[0].photoUrl}))
    } catch (error) {
      console.log(error);
    }
  };
 
  const getResponse=async()=>{
    const input={
        idToken:token
    }
    try{
        const response =await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBbfM-Y6Bv3aSPRNlB9S7qZFxVHuvF--l8',{
            method:'POST',
            body:JSON.stringify(input)
        })
        const data=await response.json()
        setData(prev=>({...prev,email:data.users[0].email}))
        return data
    }
    catch(error){
        alert(error.message)
        console.log(error)
    }
  }
  useEffect(()=>{
    getResponse()
  },[])
  const handleChange=(e)=>{
    setData(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const confirmHandler=()=>{
    setUpdated(true)
  }

  const cancelHandler=()=>{
    setEditForm(false)
  }
  return (
    <>
      {!showForm && (
        <div className="text-center">
          <Button
            className="mt-5"
            variant="dark"
            onClick={showFormHandler}
          >
            Complete your profile
          </Button>
          
        </div>
      )}

      {showForm && (
        <Card style={{ width: "30rem" }} className="mx-auto mt-5">
          {updated&&<Card.Body className="m-auto">Profile Updated</Card.Body>}
          {!updated&&<Card.Body>
            <Card.Title className="my-3">Contact Details</Card.Title>
            <Card.Text>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Full Name
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name='name'
                  value={data.name}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Email
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name='email'
                  value={data.email}
                  onChange={handleChange}
                  
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Url
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name='url'
                  value={data.url}
                  onChange={handleChange}
                />
              </InputGroup>
            </Card.Text>
            <Card.Link>
              {!editForm&&<Button variant="dark" onClick={formSubmitHandler}>
                Update
              </Button>}
              {editForm&&<Button variant="dark" onClick={confirmHandler}>
                Confirm
              </Button>}
            </Card.Link>
            <Card.Link>
              <Button variant="dark" onClick={cancelHandler}>Cancel</Button>
            </Card.Link>
          </Card.Body>}
        </Card>
      )}
    </>
  );
};

export default UpdateDetails;
