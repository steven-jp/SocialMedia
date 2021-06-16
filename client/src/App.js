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
function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);

  //Fix bug with redirect. When pasting url with /posts, goes to home.
  // Only allow certain images sent. Gifs cause errors

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts/:author/:id" component={Post} />
          <Route exact path="/posts">
            {/* {userData ? <MyPosts /> : <Redirect to="/" />} */}
            <MyPosts />
          </Route>
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
