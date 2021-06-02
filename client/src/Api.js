import axios from "axios";

let URL = "http://localhost:3000";

function getPosts() {
  axios.get(URL + "/posts").then((res) => {
    const post = res;
    console.log(post);
    return res;
  });
  return null;
}

function createPost() {
  axios.get(URL + "/posts").then((res) => {
    const post = res;
    console.log(post);
    return res;
  });
  return null;
}

export { getPosts };
