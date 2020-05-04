import * as React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div>LOGO</div>
        <h5>Create an account or log in.</h5>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    );
  }
}

export default HomePage;
