import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
import { createUser } from "../../components/Authentication/Api";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(219, 213, 212,.5)",
    borderRadius: "5px",
    textAlign: "center",
    minHeight: "60vh",
    boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.4)",
  },
}));

const Login = () => {
  const [login, setLogin] = useState(true);
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  function loginHandler(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function userHandler(e) {
    createUser(user);
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <h1>Login</h1>
      {login ? (
        <Grid container direction="column">
          <TextField
            label="Email"
            name="email"
            value={user.email}
            InputLabelProps={{ required: true }}
            onChange={loginHandler}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={user.password}
            InputLabelProps={{ required: true }}
            onChange={loginHandler}
          />
          <Button type="login" variant="contained" onClick={userHandler}>
            Login
          </Button>
          <p>
            Not a user?
            <Button
              color="primary"
              style={{ textTransform: "none" }}
              onClick={() => setLogin(!login)}
            >
              Register
            </Button>
          </p>
        </Grid>
      ) : (
        <Grid container direction="column">
          <TextField
            label="Username"
            name="username"
            value={user.username}
            InputLabelProps={{ required: true }}
            onChange={loginHandler}
          />
          <TextField
            label="Email"
            name="email"
            value={user.email}
            InputLabelProps={{ required: true }}
            onChange={loginHandler}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={user.password}
            InputLabelProps={{ required: true }}
            onChange={loginHandler}
          />
          <TextField
            label="Confirm Password"
            name="confirmedPassword"
            type="password"
            value={user.confirmedPassword}
            InputLabelProps={{ required: true }}
            onChange={loginHandler}
          />
          <Button type="login" variant="contained">
            Submit
          </Button>
          <p>
            Already have an account?
            <Button
              color="primary"
              style={{ textTransform: "none" }}
              onClick={() => setLogin(!login)}
            >
              Login
            </Button>
          </p>
        </Grid>
      )}
    </Container>
  );
};

export default Login;
