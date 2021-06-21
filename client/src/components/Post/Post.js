import React, { useState, useEffect } from "react";
import SwipeableImages from "../Swipeable/SwipeableImages";
import { isLoggedIn } from "../Authentication/Api";
import { Button } from "@material-ui/core";
import { deletePost } from "./Api";

const Post = (props) => {
  const { post } = props.location.state;

  const [userData, setUserData] = useState(null);

  //get user information.
  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);

  function deleteHandler(e) {
    deletePost(userData.userId, post.userId, post._id);
  }
  return (
    <div>
      <h1>Title: {post.title}</h1>
      <h6>Author: {post.author}</h6>

      <SwipeableImages images={post.images} />
      {userData && post && userData.userId === post.userId ? (
        <Button type="delete" variant="contained" onClick={deleteHandler}>
          Delete Post
        </Button>
      ) : null}
    </div>
  );
};

export default Post;
