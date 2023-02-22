import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate } from "react-router-dom";


const UserForm = () => {
  const handle = (event) => {
    alert("An essay was submitted: " + this.state.title);
    event.preventDefault();
  };
  return (
    <Form onSubmit={handle}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title </Form.Label>
        <Form.Control name="title" type="text" placeholder="Enter Title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description </Form.Label>
        <Form.Control name="body" type="text" placeholder="Enter Description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Id</Form.Label>
        <Form.Control name="userid" type="text" placeholder="Enter UserId" />
      </Form.Group>

      <Button variant="primary" type="submit" id="formdata">
        Submit
      </Button>
    </Form>
  );
};

const RegisterForm=()=> {
  const [state , setState] = useState({
    email : '',
    password : '',
    name : ''
  })

  const navigate = useNavigate()

console.log(state);
 const handleChange=(e)=> {
    setState({ ...state , [e.target.name] : e.target.value });
  }
 const handleSubmit=(event)=> {
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register/", {
        name: state.name,
        email: state.email,
        password: state.password,
      })
      .then((res) => {
        console.log('ressssssssssssssssssssssss ',res);
        navigate('/login')
      })
      .catch((err) => {
        console.log("errrrrrrrrr", err);
      });
  }


    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>name </Form.Label>
          <Form.Control
            name="name"
            value={state.name}
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>email </Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={state.email}
            placeholder="Enter Description"
            onChange={handleChange}

          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={state.password}
            placeholder="Enter password"
            onChange={handleChange}

          />
        </Form.Group>

        <Button variant="primary" type="submit" id="formdata">
          Submit
        </Button>
      </Form>
    );

}

export { UserForm, RegisterForm };
