import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ExpenseContext from "../context/ExpenseContext";
import { expenseActions } from "../store/expense";
import { useDispatch } from "react-redux";
const ExpenseForm = ({ data, setData, isEdit, setEditHandlerOff }) => {
  const dispatch = useDispatch();
  // const expenseCtx = useContext(ExpenseContext);
  // const {
  //   expenses: { addExpense, editExpense },
  // } = expenseCtx;
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  const inputChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const input = {
      ...data,
    };
    //addExpense(input)

    let inputId;
    const addExpenseNet = async () => {
      try {
        const response = await fetch(
          `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}.json`,
          {
            method: "POST",
            body: JSON.stringify(input),
            headers: { "Content-Type": "application/json" },
          }
        );
        inputId = await response.json();
      } catch (error) {
        console.log(error);
      }
    };
    addExpenseNet();

    dispatch(expenseActions.addExpense([inputId, input]));
    setData({ desc: "", cat: "", money: "" });
  };
  const editSubmitHandler = (e) => {
    e.preventDefault();
    const input = { ...data };
    const editExpenseNet = async () => {
      try {
        const response = await fetch(
          `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}/${input.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(input),
            headers: { "Content-Type": "application/json" },
          }
        );
        // setExpenseList((prev) => {
        //     const editExpenseIndex = prev.findIndex((expenseItem) => {
        //       return expenseItem[0] === expense.id;
        //     });
        //     console.log(editExpenseIndex);
        //     const updatedExpense= {
        //       cat: expense.cat,
        //       desc: expense.desc,
        //       money: expense.money,
        //     };
        //     let newExpenseList=[...prev]
        //     newExpenseList[editExpenseIndex][1]=updatedExpense
        //     return newExpenseList;
        //   });
      } catch (error) {
        console.log(error);
      }
    };
    editExpenseNet();
    dispatch(expenseActions.editExpense(input));
    //editExpense(input);
    setEditHandlerOff();
    setData({ desc: "", cat: "", money: "" });
  };
  const cancelSubmitHandler = () => {
    setData({ desc: "", cat: "", money: "" });
    setEditHandlerOff();
  };
  return (
    
      <Card className=" mx-auto w-50">
      <Card.Body>
        <Card.Title className="display-6 mb-4">
          Add Expenses
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" className="min-width">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="desc"
                  value={data.desc}
                  onChange={inputChangeHandler}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Category
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  name="cat"
                  value={data.cat}
                  onChange={inputChangeHandler}
                >
                  <option>Choose Category</option>
                  <option value="food">Food</option>
                  <option value="petrol">Petrol</option>
                  <option value="misc">Misc</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Money
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  name="money"
                  value={data.money}
                  onChange={inputChangeHandler}
                />
              </Col>
            </Form.Group>
            <div className="text-center">
              {!isEdit && (
                <Button variant="dark" onClick={formSubmitHandler}>
                  Add
                </Button>
              )}
              {isEdit && (
                <span>
                  <Button
                    variant="outline-dark me-5"
                    onClick={editSubmitHandler}
                  >
                    Update
                  </Button>
                  <Button variant="outline-dark" onClick={cancelSubmitHandler}>
                    Cancel
                  </Button>
                </span>
              )}
            </div>
          </Form>
        </Card.Subtitle>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  
    
  )    
};

export default ExpenseForm;
