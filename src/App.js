import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Roots from "./Pages/Roots";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import UpdateProfile from "./Pages/UpdateProfile";
import ForgotPasswordPage from "./Pages/ForgetPasswordPage";
import ExpensePage from "./Pages/ExpensePage";
import { ExpenseProvider } from "./context/ExpenseContext";
import authLoader from "./util/authLoader";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Roots />,
      children: [
        {
          path: "login",
          children: [
            { index: true, element: <LoginPage /> },
            { path: "forgotpassword", element: <ForgotPasswordPage /> },
            { path: "updateprofile", element: <UpdateProfile /> },
          ],
        },
        { path: "expenses", element: <ExpensePage /> ,loader:authLoader},
        { path: "home", element: <HomePage /> },
        {path:'*',element:<LoginPage/>}
      ],
    },
  ]);
  return (
    // <AuthProvider>
      //<ExpenseProvider>
        <RouterProvider router={router} />
      //</ExpenseProvider>
    // </AuthProvider>
  );
}

export default App;
