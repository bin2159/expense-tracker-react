import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ExpenseContext from "../context/ExpenseContext";
const ExpenseForm = ({ data, setData, isEdit, setEditHandler }) => {
  const expenseCtx = useContext(ExpenseContext);
  const {
    expenses: { addExpense, editExpense },
  } = expenseCtx;
  const inputChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const input = {
      ...data,
    };
    addExpense(input);
    setData({ desc: "", cat: "", money: "" });
  };
  const editSubmitHandler = (e) => {
    e.preventDefault();
    const input = { ...data };
    editExpense(input);
    setEditHandler();
    setData({ desc: "", cat: "", money: "" });
  };
  return (
    <Card className=" mx-auto my-4 w-50">
      <Card.Body>
        <Card.Title className="display-6 mb-4">Add Expenses</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
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
                <Button variant="outline-dark" onClick={editSubmitHandler}>
                  Edit
                </Button>
              )}
            </div>
          </Form>
        </Card.Subtitle>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ExpenseForm;
