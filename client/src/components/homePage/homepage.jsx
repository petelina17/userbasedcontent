import * as React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="homepage-box">
        <p className="App-intro">{this.state.apiResponse}</p>
        <div>
          <ForumIcon style={{ fontSize: "50" }} />
        </div>
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
