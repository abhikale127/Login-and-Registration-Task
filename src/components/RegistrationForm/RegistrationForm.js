import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function RegistrationForm(props) {
  const succes = () => {
    toast("successfully submitted! , Please login with same credentials");
  };
  const Error = () => {
    toast("Please enter valid data!");
  };

  const [formErrors, setFormErrors] = useState({});

  const [state, setState] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      first_name: state.first_name,
      last_name: state.last_name,
      email: state.email,
      password: state.password,
    };
    axios
      .post("https://glomm.herokuapp.com/api/users/register", payload)
      .then(function (response) {
        console.log(response);
        succes();
        redirectToLogin();
      })
      .catch(function (error) {
        console.log(error);
        Error();
        setFormErrors(validate(payload));
      });
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    return errors;
  };

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label>first_name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            placeholder="Enter First Name"
            value={state.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label>last_name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            placeholder="Enter First Name"
            value={state.last_name}
            onChange={handleChange}
          />
          <div className="error_text">{formErrors.name}</div>
        </div>
        <div className="form-group text-left">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <div className="error_text">{formErrors.email}</div>
        </div>
        <ToastContainer />
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>Already have an account? </span>
        <span className="loginText" onClick={() => redirectToLogin()}>
          Login here
        </span>
      </div>
    </div>
  );
}

export default withRouter(RegistrationForm);
