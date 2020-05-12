import * as React from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./loginpage.css";

class LoginPage extends React.Component {
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
        <TextField size="small" label="Username" variant="outlined" required />
        <TextField size="small" label="Password" variant="outlined" required />
        <Button
          size="medium"
          id="login-btn"
          variant="contained"
          color="secondary"
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
