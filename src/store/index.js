import authReducer from "./auth";
import expenseReducer from "./expense";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer },
});
export default store;
