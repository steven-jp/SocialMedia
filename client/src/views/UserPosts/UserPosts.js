import {
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import PostForm from "../../components/Post/PostForm";
import Post from "../../components/Post/Post";
import {
  getPosts,
  getImageByFilename,
  getImageByID,
} from "../../components/Post/Api";
import SwipeableImages from "../../components/Swipeable/SwipeableImages";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridElement: {
    width: 500,
    height: 500,
  },
}));

//Add authnetication. If user is this user we'll add a postform where they can post.
//if not the user we only display their posts.

//add functionality for a user to be able to delete their own posts

//add auto refreshing of posts.

function UserPosts() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(setPosts);
  }, [setPosts]);

  return (
    <>
      <PostForm />
      <div className={classes.root}>
        {posts ? (
          <GridList cellHeight={300} className={classes.gridElement}>
            {posts.map((post) => (
              <GridListTile key={post._id}>
                <SwipeableImages images={post.images} />
                <GridListTileBar
                  title={post.title}
                  subtitle={<span>by: {post.author}</span>}
                />
                <Post post={post} />
              </GridListTile>
            ))}
          </GridList>
        ) : null}
      </div>
    </>
  );
}

export default UserPosts;
