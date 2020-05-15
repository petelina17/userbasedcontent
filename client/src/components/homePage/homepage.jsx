import * as React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import logo from './logo.png'; 

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  // callAPI() {
  //   fetch("http://localhost:9000/testAPI")
  //     .then((res) => res.text())
  //     .then((res) => this.setState({ apiResponse: res }));
  // }
  //
  // componentWillMount() {
  //   this.callAPI();
  // }

  render() {
    return (
      <div className="homepage-box">
        {/* <p className="App-intro">{this.state.apiResponse}</p> */}
        <div style={{width:"13rem", display: "flex", alignItems: "center", justifyContent:"space-between"}}>
          <ForumIcon color="secondary" style={{ fontSize: "40", }} />
          <span
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginLeft: "0.4rem",
            }}
          >
           <img src={logo} alt="Logo" style={{height:"2.1rem"}}/>
          </span>
        </div>
        <h5>Create an account or log in.</h5>
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
