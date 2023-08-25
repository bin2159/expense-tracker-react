import React, {  useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ListExpenses from "../components/ListExpenses";

const ExpensePage = () => {
    const [data,setData]=useState({desc:'',cat:'',money:''})
    const [edit,setEdit]=useState(false)
    const setEditHandlerOn=()=>{
        setEdit(prev=>true)
    }
    const setEditHandlerOff=()=>{
      setEdit(prev=>false)
  }
  return (
    <>
      <ExpenseForm data={data} setData={setData} isEdit={edit} setEditHandlerOff={setEditHandlerOff}/>
      <ListExpenses setData={setData} setEditHandlerOn={setEditHandlerOn} setEditHandlerOff={setEditHandlerOff}/>
    </>
  );
};

export default ExpensePage;
