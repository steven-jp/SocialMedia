import axios from "axios";

let URL = "http://localhost:5000";

//Open image stream by filename
async function getImageByFilename(posts, setPosts, filename) {
  await axios
    .get(URL + `/posts/image/${filename}`, { withCredentials: true })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

//Open image stream by id
async function getImageByID(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(URL + `/posts/image/${id}`, { withCredentials: true })
      .then((res) => {
        resolve(res.config.url);
      })
      .catch((error) => {
        reject("ERROR");
      });
  });
}

//Get all the posts for a given user by providing id
async function getPostsByUserIds(setPosts, userIds) {
  let posts = [];
  axios
    .get(URL + "/posts", {
      withCredentials: true,
      params: {
        userIds: userIds,
      },
    })
    .then((res, req) => {
      posts = res.data.posts;
    })
    .then((res, req) => {
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

//get posts if userid isn't provided.
async function getPosts(setPosts) {
  let posts = [];
  axios
    .get(URL + "/posts", { withCredentials: true })

    .then((res, req) => {
      posts = res.data.posts;
    })
    .then((res, req) => {
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

//creates a post for a given user
async function createPost(formData) {
  axios
    .post(URL + "/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
    .then((res, req) => {
      console.log(res);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
async function deletePost(userId, postUserId, postId) {
  axios
    .delete(URL + `/posts/delete/${userId}/${postUserId}/${postId}`, {
      withCredentials: true,
    })
    .then((res, req) => {
      console.log(res);
      window.location.assign("/posts");
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  getPosts,
  createPost,
  getImageByFilename,
  getImageByID,
  getPostsByUserIds,
  deletePost,
};
