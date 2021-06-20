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
    });
}

function isLoggedIn(setUserData) {
  axios
    .get(URL + "/user/login", { withCredentials: true, credentials: "include" })
    .then((res) => {
      if (res.data) {
        setUserData(res.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getUserByName(author, setUserData) {
  axios
    .get(URL + "/user", {
      withCredentials: true,
      credentials: "include",
      params: {
        author: author,
      },
    })
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        setUserData(res.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
async function updateUserById(userId, attributes) {
  console.log("client ", userId, " ", attributes);
  axios
    .post(
      URL + "/user/update",
      {
        id: userId,
        attributes: attributes,
      },
      { withCredentials: true, credentials: "include" },
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

export { createUser, loginUser, isLoggedIn, getUserByName, updateUserById };
