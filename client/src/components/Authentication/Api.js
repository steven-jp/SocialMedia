import axios from "axios";

let URL = "http://localhost:5000";

async function getPosts(setPosts) {
  axios
    .get(URL + "/login")
    .then((res) => {
      setPosts(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

function createPost(values) {
  axios
    .post(URL + "/login", { title: values.title })
    .then(() => {
      console.log("Sucess");
    })
    .catch((error) => {
      console.log(error);
    });
}

export { getPosts, createPost };
