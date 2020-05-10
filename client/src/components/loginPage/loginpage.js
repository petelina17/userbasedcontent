import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import "./loginpage.css";

class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-box">
        <div> INSERT LOGO</div>
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
      </div>
    );
  }
}

export default LoginPage;
