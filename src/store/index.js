import authReducer from "./auth";
import expenseReducer from "./expense";
import themeReducer from './theme'
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, theme:themeReducer},
});
export default store;
