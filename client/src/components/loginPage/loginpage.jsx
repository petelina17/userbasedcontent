import * as React from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./loginpage.css";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLogged: false,
    };
  }

  checkLogin = () => {
    // CHECK IF EMAIL AND PASSWORD-COMBINATION EXIST
    // const loggedIn = true;
    // //IF EXIST
    // if (loggedIn) {
    //   this.setState({ isLogged: false });
    //   this.props.history.push("/content");
    // }

    // // IF NOT EXIST
    // else {
    //   this.props.location.state = false;
    //   this.setState({ isLogged: true });
    // }

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch("http://localhost:9000/login", {
      method: "PUT",
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
          // alert('You are logged in!')
          this.props.history.push("/content", "Johan");
        }
        this.setState({ isLogged: true });
      });
  };

  render() {
    return (
      <div className="login-box">
        <div style={{ display: "flex", alignItems: "center" }}>
          <ExitToAppIcon fontSize="large" />
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              marginLeft: "0.4rem",
            }}
          >
            LOGIN
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
          label="Email"
          variant="outlined"
          required
          type="email"
          onChange={(event) => {
            this.setState({ email: event.target.value });
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
