import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ExpenseContext from "../context/ExpenseContext";
import { expenseActions } from "../store/expense";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/theme";

const ListExpenses = ({ setData, setEditHandlerOn, setTheme }) => {
  const dispatch = useDispatch();

  // const expenseCtx = useContext(ExpenseContext);
  // const {
  //   expenses: { expenseList,editExpense ,removeExpense},
  // } = expenseCtx;
  const [showActivate, setShowActivate] = useState(true);
  //const [darkTheme, setDarkTheme] = useState(true);
  const [downloadURl, setDownloadURL] = useState("");
  const expenseList = useSelector((state) => state.expense.expenseList);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const darkTheme=useSelector(state=>state.theme.darkTheme)
  let email
  if(localStorage.getItem("email"))
  {
    email = localStorage.getItem("email").replace(/[@.]/g, "");
  }
  

  const getExpenses = async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}.json`
      );
      const data = await response.json();

      const list = Object.entries(data)||[];
      return list
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      
      getExpenses().then(data=>dispatch(expenseActions.setExpense(data)));

  }, []);

  const editHandler = (id, desc, cat, money) => {
    const input = { id, desc, cat, money };
    setData(input);
    setEditHandlerOn();
  };
  const removeHandler = (id, desc, cat, money) => {
    //removeExpense(id)
    const input = { id, desc, cat, money };
    const removeExpenseNet = async () => {
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
    };
    removeExpenseNet(input);
    dispatch(expenseActions.removeExpense(input));
  };
  const premiumHandler = () => {
    setShowActivate(false);
  };
  const themeHandler = () => {
    if (!darkTheme) {
      setTheme({
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        paddingTop: "2rem",
      });
    } else {
      setTheme({ paddingTop: "2rem", minHeight: "100vh" });
    }
    dispatch(themeActions.setTheme())
  };
  const downloadHandler = () => {
    const data = expenseList.map((item) => [
      item[1].desc,
      item[1].cat,
      item[1].money,
    ]);
    data.unshift(["Description", "Category", "Money"]);
    const makeCsv = (rows) => {
      return rows.map((row) => row.join(",")).join("\n");
    };
    const blob1 = new Blob([makeCsv(data)]);
    setDownloadURL(URL.createObjectURL(blob1));
  };
  return (
    <Card className="w-50 mx-auto my-4">
      <Card.Body>
        <Card.Title className="display-6 mb-4">
          Expenses
          {totalAmount > 1000 && showActivate && (
            <Button variant="dark" className="ms-5" onClick={premiumHandler}>
              Activate Premium
            </Button>
          )}
          {!showActivate && (
            <Button variant="dark" className="ms-5" onClick={themeHandler}>
              {!darkTheme ? "Dark Mode" : "Light Mode"}
            </Button>
          )}
          {!showActivate && (
            <a href={downloadURl} download="Expenses.csv">
              <Button variant="dark" className="ms-5" onClick={downloadHandler}>
                Download
              </Button>
            </a>
          )}
        </Card.Title>
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
                  <div key={expense[0]}>
                    <Row>
                      <Col>{expense[1].desc}</Col>
                      <Col>{expense[1].cat}</Col>
                      <Col>{expense[1].money}</Col>
                      <Col>
                        <Button
                          className="me-4"
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => {
                            editHandler(
                              expense[0],
                              expense[1].desc,
                              expense[1].cat,
                              expense[1].money
                            );
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className=""
                          variant="outline-dark"
                          size="sm"
                          onClick={() => {
                            removeHandler(
                              expense[0],
                              expense[1].desc,
                              expense[1].cat,
                              expense[1].money
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))
              : "No Expenses"}
          </Container>
        </Card.Text>
      </Card.Body>
      <Card.Footer>Total Amount : {totalAmount}</Card.Footer>
    </Card>
  );
};

export default ListExpenses;
