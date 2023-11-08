import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Roots = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      {/* <h1>This is root</h1> */}
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Roots;
