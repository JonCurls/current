import React from "react";
import './login.css';

function Login(){
    return(
        <form>
            <input name="email" type="email" id="email" placeholder="your email">
            </input>
            <input name="password" type="password" id="password" placeholder="**********">
            </input>
            <button type="submit" className="btn btn-primary">
          Log In
        </button>
    </form>

    )


}

export default Login