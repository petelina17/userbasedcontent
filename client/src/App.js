import React from "react";
import "./App.css";
import RegisterForm from "./components/registerForm/registerForm";
import LoginPage from "./components/loginPage/loginpage";
import Content from "./components/content/content";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalState from './contexts/GlobalState'

function App () {
  return (
    <GlobalState>
      <Router>
        <Switch>
          <Route path="/" exact component={Content} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/content" component={Content} />
          <Route path="/content:id" component={Content} />
        </Switch>
      </Router>
    </GlobalState>
  )
}

export default App;
