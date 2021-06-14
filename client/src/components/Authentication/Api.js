import axios from "axios";

let URL = "http://localhost:5000";

async function createUser(user) {
  axios
    .post(
      URL + "/user/register",
      {
        username: user.username,
        email: user.email,
        password: user.password,
        confirmedPassword: user.confirmedPassword,
      },
      { withCredentials: true, credentials: "include" },
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.id) {
        window.location.assign("/");
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

async function loginUser(user) {
  axios
    .post(
      URL + "/user/login",
      {
        email: user.email,
        password: user.password,
      },
      { withCredentials: true, credentials: "include" },
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.id) {
        window.location.assign("/");
      }
    })
    .catch((error) => {
      console.log(error);
      // console.log(error.response.data);
    });
}

export { createUser, loginUser };
