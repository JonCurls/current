import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";

import Auth from "../../utils/auth";
const Navigation = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="container">
      <nav className="text-center">
        {Auth.loggedIn() ? (
          <>
            <Link to="/cards">
              <BsCreditCard2FrontFill />
            </Link>
            <Link to="/create">
              <AiFillPlusCircle />
            </Link>
            <Link to="/delete">
              <AiFillDelete />
            </Link>
            <a href="/" onClick={logout}>
              <HiOutlineLogout />
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
