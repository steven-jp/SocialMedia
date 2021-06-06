import axios from "axios";

let URL = "http://localhost:5000";

async function getPosts(setPosts) {
  axios
    .get(URL + "/posts")
    .then((res) => {
      setPosts(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

function createPost(formData, postAttributes) {
  axios
    .post(URL + "/posts/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      // let { filePaths } = res.data;
      // console.log(filePaths);
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .post(URL + "/posts", postAttributes)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

export { getPosts, createPost };
