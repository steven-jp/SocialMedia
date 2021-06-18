import PostForm from "../../components/Post/PostForm";
import Posts from "./Posts.js";
import { useState, useEffect } from "react";
import { isLoggedIn } from "../../components/Authentication/Api";

//add functionality for a user to be able to delete their own posts

//add auto refreshing of posts.

function MyPosts() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);
  return (
    <>
      {userData ? (
        <>
          <PostForm />
          <Posts ids={userData.userId} />
        </>
      ) : null}
    </>
  );
}

export default MyPosts;
