import axios from "axios";

let URL = "http://localhost:5000";

async function getImageByFilename(posts, setPosts, filename) {
  await axios
    .get(URL + `/posts/image/${filename}`, {})
    .then((res) => {
      // setPosts(res);
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getImageByID(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(URL + `/posts/image/${id}`, {})
      .then((res) => {
        resolve(res.config.url);
      })
      .catch((error) => {
        reject("ERROR");
      });
  });
}

async function getPosts(setPosts) {
  let posts = [];
  axios
    .get(URL + "/posts", { responseType: "json" })
    .then((res) => {
      posts = res.data.posts;
    })
    .then((res) => {
      let updatedPosts = [];
      let allPromises = [];
      posts.forEach((post) => {
        let currentPost = { ...post };
        let currentPromises = [];

        //Fetch images paths from server
        post.images.forEach((img) => {
          let cur = getImageByID([img]);
          currentPromises.push(cur);
          allPromises.push(cur);
        });

        //ensure all images for current post have been fetched.
        currentPost.images = [];
        Promise.all(currentPromises).then(function (results) {
          currentPost.images = results;
        });
        updatedPosts.push(currentPost);
      });

      //update posts if all promises have completed since for each
      //doesn't wait on promises.
      Promise.all(allPromises).then(() => {
        setPosts(updatedPosts);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
function createPost(formData) {
  axios
    .post(URL + "/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res, req) => {
      console.log(res);
      // let { filePaths } = res.data;
      // console.log(filePaths);
      // imagesIds = res.files;
    })
    .catch((error) => {
      console.log(error);
    });
}

export { getPosts, createPost, getImageByFilename, getImageByID };
