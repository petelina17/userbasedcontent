import * as React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <div className={'button-nav'}>
        <Link to="/login">
          <Button variant="contained" id="loginbtn">
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
