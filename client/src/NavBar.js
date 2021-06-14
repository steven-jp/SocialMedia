import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { isLoggedIn } from "./components/Authentication/Api";

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: "rgb(89, 89, 89)",
    height: "5vh",
  },
  links: {
    height: "100%",
    color: "white",
    textDecoration: "none",
    marginLeft: "10px",
    marginTop: "5px",
    border: "1px double black",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);

  return (
    <nav className={classes.nav}>
      <Link className={classes.links} to="/">
        Home
      </Link>
      {userData ? (
        <Link className={classes.links} to="/posts">
          My posts
        </Link>
      ) : null}
      <Link className={classes.links} to="/login">
        Login
      </Link>
    </nav>
  );
};
export default NavBar;
