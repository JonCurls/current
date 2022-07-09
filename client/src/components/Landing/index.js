import React from "react";
import "./landing.css";
import { Link } from 'react-router-dom';

function Landing({handlePageChange, activeNav}) {
  return (
    
    <section id="landing">
      <h5>Welcome!</h5>
      <h2>Log in or create an account!</h2>
      <div className="container buttonContainer">
      <Link to="/login"><button type="submit" className="btn btn-primary" >Log In
        </button></Link>
        <Link to="/signup"><button type="submit" className="btn btn-primary">
          Sign up
        </button> </Link>
      </div>
    </section>
  );
}

export default Landing;
