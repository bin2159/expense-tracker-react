import React, { createContext, useEffect, useState } from "react";

const ExpenseContext = createContext();

export default ExpenseContext;
export const ExpenseProvider = ({ children }) => {
  const [expenseList, setExpenseList] = useState([]);
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch(
          `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}.json`
        );
        const data = await response.json();
        const list = Object.entries(data);
        setExpenseList(list);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, []);

  const addExpenseHandler = (expense) => {
    setExpenseList((prev) => {
      let data;
      (async function () {
        try {
          const response = await fetch(
            `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}.json`,
            {
              method: "POST",
              body: JSON.stringify(expense),
              headers: { "Content-Type": "application/json" },
            }
          );
          data = await response.json();
        } catch (error) {
          console.log(error);
        }
      })();
      return [...prev, [ data, expense]];
    });
  };
  const editExpenseHandler = (expense) => {
    (async function () {
      try {
        const response = await fetch(
          `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}/${expense.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(expense),
            headers: { "Content-Type": "application/json" },
          }
        );
        setExpenseList((prev) => {
            const editExpenseIndex = prev.findIndex((expenseItem) => {
              return expenseItem[0] === expense.id;
            });
            console.log(editExpenseIndex);
            const updatedExpense= {
              cat: expense.cat,
              desc: expense.desc,
              money: expense.money,
            };
            let newExpenseList=[...prev]
            newExpenseList[editExpenseIndex][1]=updatedExpense
            return newExpenseList;
          });
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const removeExpenseHandler = (expenseId) => {
    
    (async function () {
      try {
        const response = await fetch(
          `https://expense-tracker-data-b65bd-default-rtdb.firebaseio.com/${email}/${expenseId}.json`,
          {
            method: "DELETE",
            body: JSON.stringify(expenseId),
            headers: { "Content-Type": "application/json" },
          }
        );
        setExpenseList((prev) => {
            const newExpenseList=prev.filter(expenseItem=>expenseItem[0]!==expenseId)
            return newExpenseList
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const expenses = {
    expenseList: expenseList,
    addExpense: addExpenseHandler,
    editExpense: editExpenseHandler,
    removeExpense: removeExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={{ expenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
