import React, { useState, useRef } from "react";
import { useAlert } from "react-alert";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const { register } = require("../../services/auth.service.js");

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
//import { isEmail } from "validator";
// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

const vName = (value) => {
  if (value.length < 3 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 30 characters.
      </div>
    );
  }
};

const vUsername = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 6 and 40 characters.
      </div>
    );
  }
};

const vPassword = (value) => {
  if (value.length < 6 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 30 characters.
      </div>
    );
  }
};

const Register = (props) => {
  //use when validate form-group
  const form = useRef();
  //use for count error
  const checkBtn = useRef();
  //display alert create success
  const alert = useAlert();

  //STATE of component
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  //On change username, password, name, repeat_password
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeRepeatPassword = (e) => {
    const repeatPassword = e.target.value;
    setRepeatPassword(repeatPassword);
  };

  //Confirm password and call api to resgister account
  //in database
  const handleRegister = (e) => {
    e.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (password !== repeatPassword) {
        setMessage("password and repeat password don't match");
      } else {
        register(name, username, password, repeatPassword)
          .then((res) => {
            setMessage("");
            alert.success("Register success!");
            props.history.push("/login");
            window.location.reload();
          })
          .catch((err) => {
            setMessage(err.response.data.message);
          });
      }
    }
  };

  const handleLogin = ()=>{
    props.history.push("/login");
    window.location.reload();
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vUsername]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onChangeName}
                validations={[required, vName]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vPassword]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <Input
                type="password"
                className="form-control"
                name="repeatPassword"
                value={repeatPassword}
                onChange={onChangeRepeatPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          </div>
          {message && (
            <div className="form-group">
              <div className={"alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <button className="btn btn-block" onClick={()=>handleLogin()}>
          <span>Login</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
