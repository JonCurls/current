import React, {useState} from "react";
import './register.css';
import {useMutation} from '@apollo/client';
import { ADD_USER } from '../../utils/mutations'; //TODO: Backend needs to add addUser mutation
import Auth from '../../utils/auth'; 

const Register = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const {name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    } 

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