import "./App.css";
import MyPosts from "./views/Posts/MyPosts";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import { isLoggedIn } from "../src/components/Authentication/Api";
import NavBar from "../src/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);

  console.log(userData);
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          {userData ? <Route path="/posts" component={MyPosts} /> : null}
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
