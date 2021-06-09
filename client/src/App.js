import "./App.css";
import UserPosts from "./views/UserPosts/UserPosts";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";

import NavBar from "../src/NavBar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" component={UserPosts} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
