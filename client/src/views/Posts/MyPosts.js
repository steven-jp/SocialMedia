import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import PostForm from "../../components/Post/PostForm";
import Posts from "./Posts.js";
import { getPosts } from "../../components/Post/Api";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginTop: "50px",
  },
  gridElement: {
    margin: "100px",
  },
}));

//Add authnetication. If user is this user we'll add a postform where they can post.
//if not the user we only display their posts.

//add functionality for a user to be able to delete their own posts

//add auto refreshing of posts.

function MyPosts() {
  // const classes = useStyles();

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   getPosts(setPosts);
  // }, [setPosts]);

  return (
    <>
      <PostForm />
      <Posts />
    </>
  );
}

export default MyPosts;
