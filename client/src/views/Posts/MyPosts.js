import PostForm from "../../components/Post/PostForm";
import Posts from "./Posts.js";

//add functionality for a user to be able to delete their own posts

//add auto refreshing of posts.

function MyPosts() {
  return (
    <>
      <PostForm />
      <Posts />
    </>
  );
}

export default MyPosts;
