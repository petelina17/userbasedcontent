import * as React from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./loginpage.css";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
    };
  }

  login = () => {
    // CHECK IF EMAIL AND PASSWORD-COMBINATION EXIST
    const loggedIn = true;
    //IF EXIST
    if (loggedIn) {
      this.setState({ isLogged: false });
      this.props.history.push("/content");
    }

    // IF NOT EXIST
    else {
      this.props.location.state = false;
      this.setState({ isLogged: true });
    }
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
            Password and email doesnt exist.
            <br /> Try again
          </div>
        ) : (
          <></>
        )}

        <TextField size="small" label="Username" variant="outlined" required />
        <TextField size="small" label="Password" variant="outlined" required />
        <Button
          size="medium"
          id="login-btn"
          variant="contained"
          color="secondary"
          onClick={this.login}
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
