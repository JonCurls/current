import React from "react";
import "./landing.css";

function Landing({handlePageChange, activeNav}) {
  return (
    
    <section id="landing">
      <h5>Welcome!</h5>
      <h2>Log in or create an account!</h2>
      <div className="container buttonContainer">
        <button type="submit"  onClick={() => handlePageChange('login')} className={activeNav === 'login' ? 'active' : ''}>
          Log in
        </button>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </section>
  );
}

export default Landing;
