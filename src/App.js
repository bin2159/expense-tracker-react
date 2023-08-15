import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Roots from "./Pages/Roots";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Roots />,
      children: [{ index: true, element: <LoginPage />},{path:'home',element:<HomePage/>}],
    },
  ]);
  return <AuthProvider><RouterProvider router={router}/></AuthProvider>;
}

export default App;