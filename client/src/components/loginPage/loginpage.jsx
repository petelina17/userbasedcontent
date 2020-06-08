import * as React from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./loginpage.css";
import logo from "./logo.png";
import StateContext from '../../contexts/StateContext'

export const rememberUser = (username, context) => {
  context.username = username;
  localStorage.setItem('ubc.username', username)
}

export const checkLogin = (username, password, history, context) => {
  const data = {
    username: username,
    password: password,
  };

  fetch("http://localhost:9000/login", {
    method: "POST",
    credentials: 'include',
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
          rememberUser(data.username, context)
          history.push("/content");
        }
      });
};

class LoginPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogged: false,
    };
  }

  static contextType = StateContext

  render () {
    return (
      <div className="login-box">
        <div style={{ width: "13rem", display: "flex", alignItems: "center" }}>
          <ExitToAppIcon fontSize="large" color="secondary" />
          <span
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginLeft: "0.4rem",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: "2.1rem" }} />
          </span>
        </div>

        {this.context.userCreated === true ? (
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
          onClick={() => {
            checkLogin(this.state.username, this.state.password, this.props.history, this.context)
          }}
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
