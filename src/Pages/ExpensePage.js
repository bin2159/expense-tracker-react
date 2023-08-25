import React, { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ListExpenses from "../components/ListExpenses";

const ExpensePage = () => {
  const [data, setData] = useState({ desc: "", cat: "", money: "" });
  const [edit, setEdit] = useState(false);
  const [theme,setTheme]=useState({ paddingTop:'2rem',minHeight:'100vh'})
  const setEditHandlerOn = () => {
    setEdit( true);
  };
  const setEditHandlerOff = () => {
    setEdit(false);
  }
  return (
    <div style={theme}>
      
      <ExpenseForm
        data={data}
        setData={setData}
        isEdit={edit}
        setEditHandlerOff={setEditHandlerOff}
      />
      <ListExpenses
        setData={setData}
        setTheme={setTheme}
        setEditHandlerOn={setEditHandlerOn}
        setEditHandlerOff={setEditHandlerOff}
      />
    </div>
  );
};

export default ExpensePage;
