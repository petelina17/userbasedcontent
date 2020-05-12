import * as React from "react";
import { Link } from "react-router-dom";
import "./registerForm.css";
import { TextField, Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

class RegisterForm extends React.Component {
  render() {
    return (
      <div className="register-box">
        <div style={{ display: "flex", alignItems: "center" }}>
          <PersonAddIcon fontSize="large" />
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              marginLeft: "0.4rem",
            }}
          >
            REGISTER
          </span>
        </div>
        <TextField size="small" label="Full name" variant="outlined" />
        <TextField size="small" label="Email" variant="outlined" />
        <TextField size="small" label="Phonenumber" variant="outlined" />
        <TextField size="small" label="Password" variant="outlined" />
        <TextField size="small" label="Confirm Password" variant="outlined" />
        <Button
          size="medium"
          id="login-btn"
          variant="contained"
          color="secondary"
        >
          REGISTER
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }
}

export default RegisterForm;
