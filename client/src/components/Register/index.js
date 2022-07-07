import React from "react";
import './register.css';

function Register(){
    return(
        <form>
            <input name="email" type="email" id="email" placeholder="your email">
            </input>
            <input name="password" type="password" id="password" placeholder="**********">
            </input>
            <button type="submit" className="btn btn-primary">
          Sign Up!
        </button>
    </form>

    )


}

export default Register