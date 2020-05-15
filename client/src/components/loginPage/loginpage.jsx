import * as React from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./loginpage.css";
import logo from './logo.png'; 

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLogged: false,
    };
  }

  checkLogin = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("[ERROR]", err);
      })
      .then((res) => {
        console.log("login response: ", res);
        if (res.login === true) {
          this.props.history.push("/content", this.state.username);
        }
        this.props.location.state = false;
        this.setState({ isLogged: true });
      });
  };

  render() {
    return (
      <div className="login-box">
        <div style={{width:"13rem", display: "flex", alignItems: "center", justifyContent:"space-between"}}>
          <ExitToAppIcon fontSize="large" color="secondary"/>
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

        {this.props.location.state === true ? (
          <div className="usercreated-div">
            Your user was successfully created.
          </div>
        ) : (
          <></>
        )}

        {this.state.isLogged === true ? (
          <div className="notLoggedText-div">
            Invalid username or email.
            <br /> Try again
          </div>
        ) : (
          <></>
        )}

        <TextField
          size="small"
          label="Username"
          variant="outlined"
          required
          type="text"
          value={this.state.username}
          onChange={(event) => {
            this.setState({ username: event.target.value });
          }}
        />
        <TextField
          size="small"
          label="Password"
          variant="outlined"
          required
          type="password"
          onChange={(event) => {
            this.setState({ password: event.target.value });
          }}
        />
        <Button
          size="medium"
          id="login-btn"
          variant="contained"
          color="secondary"
          onClick={this.checkLogin}
        >
          LOGIN
        </Button>
        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    );
  }
}

export default LoginPage;
