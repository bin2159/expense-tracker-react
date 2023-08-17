import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Roots from "./Pages/Roots";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import UpdateProfile from "./Pages/UpdateProfile";
import ForgotPasswordPage from "./Pages/ForgetPasswordPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Roots />,
      children: [
        {
          path: "/login",
          children: [
            { index: true, element: <LoginPage /> },
            { path: "forgotpassword", element: <ForgotPasswordPage /> },
            { path: "updateprofile", element: <UpdateProfile /> },
          ],
        },

        { path: "home", element: <HomePage /> },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
