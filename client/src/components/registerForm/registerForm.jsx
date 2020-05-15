import * as React from "react";
import { Link } from "react-router-dom";
import "./registerForm.css";
import { TextField, Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import logo from './logo.png'; 

let users = [];

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      userCreated: false,
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNr: "",
      passwordError: "",
      emailError: "",
      phoneError: "",
      fullNameError: "",
    };
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    let isError = false;
    if (
      this.state.email.indexOf("@") === -1 ||
      this.state.email.indexOf(".") === -1
    ) {
      this.setState({ emailError: "Email must contain '@' and '.'." });
      isError = true;
    }

    if (this.state.fullName.length < 4) {
      this.setState({
        fullNameError: "More than 4 characters.",
      });
      isError = true;
    }
    if (
      (this.state.password !== this.state.confirmPassword &&
        this.state.password.length > 6) ||
      this.state.confirmPassword.length > 6
    ) {
      this.setState({ passwordError: "Your passwords must match." });
      isError = true;
    }
    if (
      (this.state.password === this.state.confirmPassword &&
        this.state.password.length < 6) ||
      this.state.confirmPassword.length < 6
    ) {
      this.setState({ passwordError: "Minimum 6 characters long." });
      isError = true;
    }

    if (
      (this.state.password !== this.state.confirmPassword &&
        this.state.password.length < 6) ||
      this.state.confirmPassword.length < 6
    ) {
      this.setState({
        passwordError: "Min 6 characters & same passwords",
      });
      isError = true;
    }

    if (this.state.phoneNr.length !== 10) {
      this.setState({
        phoneError: "Min and maximum 10 numbers long",
      });
      isError = true;
    }

    return isError;
  };

  submit = (e) => {
    // e.preventDefault();
    this.setState({
      fullNameError: "",
      passwordError: "",
      phoneError: "",
      emailError: "",
    });
    const error = this.validate();
    if (!error) {
      this.setState({
        error: false,
        userExist: false,
        userCreated: true,
        fullNameError: "",
        passwordError: "",
        phoneError: "",
        emailError: "",
      });

      // SAVE VALUES OF USER TO DATABASE
      let user = {
        fullname: this.state.fullName,
        username: this.state.username,
        phoneNumber: this.state.phoneNr,
        email: this.state.email,
        password: this.state.password,
      };

      fetch("http://localhost:9000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log("[ERROR]", err);
        })
        .then((res) => {
          console.log("register response: ", res);
          if (res.success === true) {
            // alert('You are registered!')
            let userCreated = true;
            this.props.history.push("/login", userCreated);
            this.setState({ userExist: false });
          } else if (res.error == "user already exist") {
            this.setState({ userExist: true });
          }
        });
    }
  };

  render() {
    return (
      <form className="register-box">
        <div style={{width:"13rem", display: "flex", alignItems: "center", justifyContent:"space-between"}}>
          <PersonAddIcon fontSize="large" color="secondary"/>
          <span
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginLeft: "0.4rem",
            }}
          >
           <img src={logo} alt="Logo" style={{height:"2.1rem"}}/>
          </span>
        </div>
        {this.state.userExist === true ? (
          <div className="userExists-div">User already exists</div>
        ) : (
          <></>
        )}
        <TextField
          id="fullName"
          onChange={this.change}
          name="fullName"
          value={this.state.fullName}
          size="small"
          label="Full name"
          variant="outlined"
          helperText={this.state.fullNameError}
        />
        <TextField
          id="username"
          onChange={this.change}
          name="username"
          value={this.state.username}
          size="small"
          label="Username"
          variant="outlined"
        />
        <TextField
          id="email"
          onChange={this.change}
          name="email"
          value={this.state.email}
          size="small"
          label="Email"
          variant="outlined"
          helperText={this.state.emailError}
        />
        <TextField
          id="phoneNr"
          onChange={this.change}
          name="phoneNr"
          value={this.state.phoneNr}
          size="small"
          label="Phonenumber"
          variant="outlined"
          helperText={this.state.phoneError}
        />
        <TextField
          id="password"
          type="password"
          onChange={this.change}
          name="password"
          value={this.state.password}
          size="small"
          label="Password"
          variant="outlined"
          helperText={this.state.passwordError}
        />
        <TextField
          type="password"
          onChange={this.change}
          name="confirmPassword"
          value={this.state.confirmPassword}
          size="small"
          label="Confirm Password"
          variant="outlined"
          helperText={this.state.passwordError}
        />
        <Button
          size="medium"
          id="login-btn"
          variant="contained"
          color="secondary"
          onClick={this.submit}
        >
          REGISTER
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    );
  }
}

export default RegisterForm;
