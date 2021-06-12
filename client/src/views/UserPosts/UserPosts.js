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
import { getPosts } from "../../components/Post/Api";
import SwipeableImages from "../../components/Swipeable/SwipeableImages";
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

function UserPosts() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(setPosts);
  }, [setPosts]);
  console.log(posts);
  return (
    <>
      <PostForm />
      <div className={classes.root}>
        <Container maxWidth="md">
          {posts ? (
            <GridList cellHeight={300} className={classes.gridElement}>
              {posts.map((post) => (
                <GridListTile key={post._id}>
                  <SwipeableImages images={post.images} />
                  <Post post={post} />
                  <GridListTileBar
                    title={post.title}
                    subtitle={<span>by: {post.author}</span>}
                  />
                </GridListTile>
              ))}
            </GridList>
          ) : null}
        </Container>
      </div>
    </>
  );
}

export default UserPosts;
