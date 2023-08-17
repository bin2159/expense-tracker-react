import { useContext } from "react";
import Card from "react-bootstrap/Card";
import ExpenseContext from "../context/ExpenseContext";
import { Container, Row, Col, Button } from "react-bootstrap";

const ListExpenses = ({setData,setEditHandler}) => {
  const expenseCtx = useContext(ExpenseContext);
  const {
    expenses: { expenseList,editExpense ,removeExpense},
  } = expenseCtx;
  const editHandler=(id,desc,cat,money)=>{
    const input={id,desc,cat,money}
    setData(input)
    setEditHandler()
    editExpense(input)
 }
 const removeHandler=(id)=>{
    removeExpense(id)
 }
 
  return (
    <Card className="w-50 mx-auto my-4">
      <Card.Body>
        <Card.Title className="display-6 mb-4">Expenses</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          <Container className="text-center text-underline">
            <Row>
              <Col>Description</Col>
              <Col>Category</Col>
              <Col>Money</Col>
              <Col>Action</Col>
            </Row>
          </Container>
        </Card.Subtitle>
        <Card.Text>
          <Container className="text-center">
            {expenseList.length
              ? expenseList.map((expense) => (
                  <Row key={expense[0]}>
                    <Col>{expense[1].desc}</Col>
                    <Col>{expense[1].cat}</Col>
                    <Col>{expense[1].money}</Col>
                    <Col>
                      <Button className="me-4" variant="outline-secondary" size="sm" onClick={()=>{editHandler(expense[0],expense[1].desc,expense[1].cat,expense[1].money)}}>
                        Edit
                      </Button>
                      <Button className="" variant="outline-dark" size="sm" onClick={()=>{removeHandler(expense[0])}}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                ))
              : "No Expenses"}
          </Container>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ListExpenses;
