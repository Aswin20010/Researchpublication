import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { User } from "./pages/User";
import { Conference } from "./pages/Conference";
import { Journal } from "./pages/Journal";
import { Search as SearchNational } from "./pages/SearchNational";
import { Search as SearchInterNational } from "./pages/SearchInterNational";
import { Search as SearchNormal } from "./pages/SearchNormal";
import { Search as SearchScopus } from "./pages/SearchScopus";
import { Search as SearchThomson } from "./pages/SearchThomson";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/user" exact component={User} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/user/conference" exact component={Conference} />
        <Route path="/user/journal" exact component={Journal} />
        <Route path="/user/conference/search/national" exact component={SearchNational} />
        <Route path="/user/conference/search/international" exact component={SearchInterNational} />
        <Route path="/user/journal/search/normal" exact component={SearchNormal} />
        <Route path="/user/journal/search/scopus" exact component={SearchScopus} />
        <Route path="/user/journal/search/thomson" exact component={SearchThomson} />
      </Switch>
    </Router>
  );
};

export default App;
