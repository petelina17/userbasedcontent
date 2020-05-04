import * as React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class HomePage extends React.Component {
  render() {
    return (
      <div className="homepage-box">
        <div>INSERT LOGO</div>
        <h5>Create an account or log in.</h5>
        <Link to="/login">
          <Button variant="contained" color="default" id="loginbtn">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="contained" color="secondary" id="registerbtn">
            Register
          </Button>
        </Link>
      </div>
    );
  }
}

export default HomePage;
