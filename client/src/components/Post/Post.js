import React from "react";
import SwipeableImages from "../Swipeable/SwipeableImages";
const Post = (props) => {
  const { post } = props.location.state;
  console.log(post);
  return (
    <div>
      <h1>Title: {post.title}</h1>
      <h6>Author: {post.author}</h6>

      <SwipeableImages images={post.images} />
    </div>
  );
};

export default Post;
