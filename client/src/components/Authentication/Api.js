import axios from "axios";

let URL = "http://localhost:5000";

async function createUser(user) {
  console.log(user);
  axios
    .post(URL + "/user/register", {
      username: user.username,
      email: user.email,
      password: user.password,
      confirmedPassword: user.confirmedPassword,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

async function loginUser(user) {
  console.log(user);
  axios
    .post(URL + "/user/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

export { createUser, loginUser };
