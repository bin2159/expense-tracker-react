import React, {  useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ListExpenses from "../components/ListExpenses";

const ExpensePage = () => {
    const [data,setData]=useState({desc:'',cat:'',money:''})
    const [edit,setEdit]=useState(false)
    const setEditHandler=()=>{
        setEdit(prev=>!prev)
    }
  return (
    <>
      <ExpenseForm data={data} setData={setData} isEdit={edit} setEditHandler={setEditHandler}/>
      <ListExpenses setData={setData} setEditHandler={setEditHandler}/>
    </>
  );
};

export default ExpensePage;
