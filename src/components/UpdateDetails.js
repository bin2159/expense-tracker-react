import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";

const UpdateDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const nameRef = useRef();
  const urlRef = useRef();

  const showFormHandler = () => {
    console.log("ff");
    setShowForm((prev) => !prev);
  };
  const formSubmitHandler = async () => {
    const input = {
      fullName: nameRef.current.value,
      url: urlRef.current.value,
    };
    try {
        const email=localStorage.getItem('email').replace(/[@.]/g,'')
        const response = await fetch(
        `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}/profile.json`,
        {
          method: "POST",
          body: JSON.stringify(input),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data=await response.json()
        localStorage.setItem('profileId',data)
        alert('form submitted')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!showForm && (
        <div className="text-center">
          <Button
            className="mt-5 text-center"
            variant="dark"
            onClick={showFormHandler}
          >
            Complete your profile
          </Button>
        </div>
      )}

      {showForm && (
        
          <Card style={{ width: "30rem" }} className="mx-auto mt-5">
            <Card.Body>
              <Card.Title className="my-3">Contact Details</Card.Title>
              <Card.Text>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Full Name
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    ref={nameRef}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Url
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    ref={urlRef}
                  />
                </InputGroup>
              </Card.Text>
              <Card.Link>
                <Button variant="dark" onClick={formSubmitHandler}>
                  Update
                </Button>
              </Card.Link>
              <Card.Link>
                <Button variant="dark">Cancel</Button>
              </Card.Link>
            </Card.Body>
          </Card>
        
      )}
    </>
  );
};

export default UpdateDetails;
