import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './login.css';


function Login() {
    // set initial form
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };
    //addUser mutation converted to const, error+data will not be used hence console.log
    const [loginUser, { error, data }] = useMutation(LOGIN_USER);
    console.log(error, data);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(userFormData);
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await loginUser({
                variables: { ...userFormData },
            });

            if (!data) {
                throw new Error(error);
            }
            console.log(data);
            Auth.login(data.login.token);
        } catch (err) {
            console.log('Urgent! Your login attempt was cringe! Pls try again :3');
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            email: '',
            password: '',
        });
    };

    return (
        <>
            {/* This is needed for the validation functionality above */}
            <Form noValidate validate={validated} onSubmit={handleFormSubmit}>
                {/* show alert if server response is bad */}
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong! Your login credentials were cringe! Pls try again :3
                </Alert>
                <Form.Group>
                    <Form.Label htmlFor='email'> Email </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your Email'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Your Password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default Login