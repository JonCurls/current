import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./register.css";

const Register = () => {
  // set initial form // state usestate({ username:'' }) cut
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  //addUser mutation converted to const, error+data will not be used hence console.log
  const [addUser, { error, data }] = useMutation(ADD_USER);
  console.log(error, data);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //check if form has everything (source: react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      if (!data) {
        throw new Error(error);
      }

      Auth.login(data.addUser.token);
    } catch (err) {
      console.log("Something went wrong! Please try again.");
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      // username: '', no usernames in this
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>
        {/* username <Form.Group> </Form.Group> cut */}
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your Email Address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your Password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button //!(userformdata.username && cut)
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          className="btn btn-primary"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;
