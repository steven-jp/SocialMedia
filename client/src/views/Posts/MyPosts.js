import PostForm from "../../components/Post/PostForm";
import Posts from "./Posts.js";
import { useState, useEffect } from "react";
import { isLoggedIn } from "../../components/Authentication/Api";

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
