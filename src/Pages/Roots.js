import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Roots = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Roots;
