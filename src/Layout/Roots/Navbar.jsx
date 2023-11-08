import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut();
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-foods">Available Foods</NavLink>
      </li>
      <li>
        <NavLink to="/addFood">Add Food</NavLink>
      </li>
      <li>
        <NavLink to="/manage-my-food">Manage My Foods</NavLink>
      </li>

      <li>
        <NavLink to="/requested-foods">My Food Request</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu gap-2 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box "
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <img
              className="w-40"
              src="https://i.ibb.co/sjD5LqK/logo.png"
              alt=""
            />
          </Link>
          {/* <a className="btn btn-ghost normal-case text-xl">TechValley</a> */}
        </div>
        <div className="navbar-center  hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end gap-3">
          {user ? <p>{user?.displayName}</p> : ""}

          {user ? (
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} />
              </div>
            </label>
          ) : (
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://i.ibb.co/HTC51Wq/icon.jpg" />
              </div>
            </label>
          )}
          {user ? (
            <button onClick={handleLogOut} className="btn">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
