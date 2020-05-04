import * as React from "react";
import "./registerForm.css";
import { TextField, Button } from "@material-ui/core";

class RegisterForm extends React.Component {
  render() {
    return (
      <div className="register-box">
        <div>INSERT LOGO</div>
        <TextField size="small" label="Full name" variant="outlined" />
        <TextField size="small" label="Email" variant="outlined" />
        <TextField size="small" label="Phonenumber" variant="outlined" />
        <TextField size="small" label="Password" variant="outlined" />
        <TextField size="small" label="Confirm Password" variant="outlined" />
        <Button
          size="small"
          id="login-btn"
          variant="contained"
          color="secondary"
        >
          REGISTER
        </Button>
      </div>
    );
  }
}

export default RegisterForm;
