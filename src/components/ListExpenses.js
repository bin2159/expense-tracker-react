import { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ExpenseContext from "../context/ExpenseContext";
import { expenseActions } from "../store/expense";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ListExpenses = ({setData,setEditHandlerOn}) => {
  
  const dispatch=useDispatch()

  // const expenseCtx = useContext(ExpenseContext);
  // const {
  //   expenses: { expenseList,editExpense ,removeExpense},
  // } = expenseCtx;
  const expenseList=useSelector(state=>state.expense.expenseList)
  const totalAmount=useSelector(state=>state.expense.totalAmount)
  const email=localStorage.getItem('email').replace(/[@.]/g, "");
  
  const getExpenses =async ()=> {
    try {
      const response = await fetch(
        `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}.json`
      );
      const data = await response.json();
      const list = Object.entries(data);
      dispatch(expenseActions.setExpense(list))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getExpenses()
  },[])

  const editHandler=(id,desc,cat,money)=>{
    const input={id,desc,cat,money}
    setData(input)
    setEditHandlerOn()
 }
 const removeHandler=(id,desc,cat,money)=>{
    //removeExpense(id)
    const input={id,desc,cat,money}
    const removeExpenseNet= async() =>{
      try {
        const response = await fetch(
          `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}/${input.id}.json`,
          {
            method: "DELETE",
            body: JSON.stringify(input.id),
            headers: { "Content-Type": "application/json" },
          }
        );
       
      } catch (error) {
        console.log(error);
      }
    }
    removeExpenseNet(input)
    dispatch(expenseActions.removeExpense(input))
 }
 
  return (
    <Card className="w-50 mx-auto my-4">
      <Card.Body>
        <Card.Title className="display-6 mb-4">Expenses
        {totalAmount>1000&&<Button variant="dark" className="ms-5">Activate Premium</Button>}</Card.Title>
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
            {
            expenseList.length
              ?
              expenseList.map((expense) => (
                <div key={expense[0]}>
                   <Row>
                    <Col>{expense[1].desc}</Col>
                    <Col>{expense[1].cat}</Col>
                    <Col>{expense[1].money}</Col>
                    <Col>
                      <Button className="me-4" variant="outline-secondary" size="sm" onClick={()=>{editHandler(expense[0],expense[1].desc,expense[1].cat,expense[1].money)}}>
                        Edit
                      </Button>
                      <Button className="" variant="outline-dark" size="sm" onClick={()=>{removeHandler(expense[0],expense[1].desc,expense[1].cat,expense[1].money)}}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </div>
                 
                ))
              : "No Expenses"
              }
          </Container>
        </Card.Text>
      </Card.Body>
      <Card.Footer>Total Amount : {totalAmount}</Card.Footer>
    </Card>
  );
};

export default ListExpenses;
