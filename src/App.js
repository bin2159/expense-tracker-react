import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Roots from "./Pages/Roots";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import UpdateProfile from "./Pages/UpdateProfile";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Roots />,
      children: [
        { path:"login", element: <LoginPage /> },
        { path: "home", element: <HomePage /> },
        {path:'updateprofile',element:<UpdateProfile/>}
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
