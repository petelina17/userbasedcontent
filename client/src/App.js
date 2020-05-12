import React from "react";
import "./App.css";
import HomePage from "./components/homePage/homepage";
import RegisterForm from "./components/registerForm/registerForm";
import LoginPage from "./components/loginPage/loginpage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterForm} />
      </Switch>
    </Router>
  );
}

export default App;