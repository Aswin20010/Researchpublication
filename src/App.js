import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { User } from "./pages/User";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/user" exact component={User} />
        <Route path="/admin" exact component={Admin} />
      </Switch>
    </Router>
  );
};

export default App;
