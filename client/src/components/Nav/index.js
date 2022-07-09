import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './nav.css';




import { RiNumber1 } from 'react-icons/ri'
import { RiNumber2 } from 'react-icons/ri'
import { RiNumber3 } from 'react-icons/ri'
import { RiNumber4 } from 'react-icons/ri'


const Nav = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };
    return (
                <div className="container">
                

                <nav className="text-center">
                    {Auth.loggedIn() ? (
                        <>
                            <Link to="/cards">My Cards</Link>
                            <a href="/" onClick={logout}>
                                Logout
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
export default Nav;