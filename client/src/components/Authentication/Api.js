import axios from "axios";

let URL = "http://localhost:5000";

async function createUser(user) {
  console.log(user);
  axios
    .put(URL + "/user/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

export { createUser };
