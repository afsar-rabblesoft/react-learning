import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";

const Token = React.createContext("abc");

const LoginForm = () =>  {
  const [state , setState] = useState({
    email : '',
    password : ''
  })
 
 const  navigate = useNavigate()
console.log(state);
 const  handleChange = (event) => {
    setState({ value: event.target.value });
  }

 const  handleSubmit = (event) => {
    const email = event.target.email.value;
    const password = event.target.password.value;
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/login/",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token' , res.data.token)
        // localStorage.getItem('token')
        alert("Success");
        navigate(`/images`)
      })
      .catch((err) => {
        alert("Andha Hai Kya Sahi Se Email Pass Bhar");

        console.log("errrrrrrrrr", err);
      });
  }

 
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >Email Address </Form.Label>
          <Form.Control
            name="email"
            value={state.email}
            type="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={state.password}
            placeholder="Enter password"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/register"><button>Register</button></Link>
      </Form>
     
    );
  
}

export { LoginForm };
