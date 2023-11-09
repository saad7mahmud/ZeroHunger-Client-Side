import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ThemeSwitcher from "../../Theme/ThemeSwitcher";

const Roots = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      {/* <h1>This is root</h1> */}
      <Navbar></Navbar>
      <ThemeSwitcher></ThemeSwitcher>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Roots;
