import { useEffect, useReducer, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
};
const Login = () => {
  const [login, setLogin] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(null);
  const confirmRef = useRef();
  const emailHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };
  const passwordHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });
  };
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {
    const id = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && confirmPasswordIsValid);
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]);
  const confirmPasswordHandler = (e) => {
    if (confirmRef.current.value === passwordState.value) {
      setConfirmPasswordIsValid(true);
    } else {
      setConfirmPasswordIsValid(false);
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailState.value;
    const enteredPassword = passwordState.value;
    if (login) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbfM-Y6Bv3aSPRNlB9S7qZFxVHuvF--l8        ",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers:{'Content-Type':'application/json'}
        }
      ).then(res=>{
        if(res.ok){

        }else{
           return res.json().then(data=>{
                let errorMessage='Authitication Failed'
                if(data.error&&data.error.message){
                    errorMessage=data.error.message
                }
                alert(errorMessage)
            })
        }
      })
    }
  };
  return (
    <>
      <Card className="text-center w-50 mx-auto mt-5">
        <Card.Header className="display-5">SignUp</Card.Header>
        <Card.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              isInvalid={emailIsValid === true || null ? false : true}
              onChange={emailHandler}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              isInvalid={passwordIsValid === true || null ? false : true}
              onChange={passwordHandler}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password">
            <Form.Control
              type="password"
              placeholder="Password"
              isInvalid={confirmPasswordIsValid === true || null ? false : true}
              onChange={confirmPasswordHandler}
              ref={confirmRef}
            />
          </FloatingLabel>
          <Button
            type="submit"
            variant="primary mt-3"
            disabled={!formIsValid}
            onClick={formSubmitHandler}
          >
            Sign up
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">Have an account?Login</Card.Footer>
      </Card>
    </>
  );
};

export default Login;
