import { createSlice } from "@reduxjs/toolkit";

let email
if(localStorage.getItem('email')){
  email = localStorage.getItem("email").replace(/[@.]/g, "");

}

const initialState={expenseList:[],totalAmount:0}
const expenseSlice=createSlice({
    name:'expense',
    initialState,
    reducers:{
      setExpense(state,action){
        if(Array.isArray(action.payload)){
          state.expenseList=action.payload
        }else{
          state.expenseList=[]
        }
        
        const total=state.expenseList.reduce((acc,curr)=>acc+Number(curr[1].money),0)
        state.totalAmount=total
      },
      addExpense(state,action){
        state.expenseList=[...state.expenseList,action.payload]
        state.totalAmount=state.totalAmount+Number(action.payload[1].money)
      },
      editExpense(state,action){
        const {payload}=action
        const duplicateIndex=state.expenseList.findIndex(item=>item[0]===payload.id)
        state.totalAmount=state.totalAmount-Number(state.expenseList[duplicateIndex][1].money)+Number(payload.money)
        state.expenseList[duplicateIndex][1]={...payload}
      },
      removeExpense(state,action){
        const filterList=state.expenseList.filter(item=>item[0]!==action.payload.id)
        state.expenseList=filterList
        state.totalAmount=state.totalAmount-Number(action.payload.money)
      }
    }
})
export default expenseSlice.reducer
export const expenseActions=expenseSlice.actions