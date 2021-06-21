import "./App.css";
import MyPosts from "./views/Posts/MyPosts";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import { isLoggedIn } from "../src/components/Authentication/Api";
import NavBar from "../src/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "./components/Post/Post";
import Profile from "./views/Profile/Profile";
function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);

  /*BUGS =======================:
   - Logged in users don't receive rendered NotFound.
   - Only allow certain images sent. Gifs cause errors 
   - controlled/uncontrolled props location error.
   - Renders other routes when clicking links
   */

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          {userData ? (
            <>
              <Route path="/posts/:author/:id" component={Post} />
              <Route path="/user/:author" component={Profile} />
              <Route exact path="/posts" component={MyPosts} />
            </>
          ) : null}
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
