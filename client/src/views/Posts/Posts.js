import {
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { getPosts, getPostsByUserIds } from "../../components/Post/Api";
import SwipeableImages from "../../components/Swipeable/SwipeableImages";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../components/Authentication/Api";

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

function Posts() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData) {
      // getPosts(setPosts);
      getPostsByUserIds(setPosts, userData.userId);
    }
  }, [setPosts, userData]);

  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);

  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="md">
          {posts ? (
            <GridList cellHeight={300} className={classes.gridElement}>
              {posts.map((post) => (
                <GridListTile key={post._id}>
                  <SwipeableImages images={post.images} />
                  {/* <Post post={post} /> */}
                  <Link
                    to={{
                      pathname: `/posts/${post.author}/${post._id}`,
                      state: { post: post },
                    }}
                  >
                    {/* <Route
                      path="posts/:author/:id"
                      render={(props) => {
                        return <Post post={post} {...props} />;
                      }}
                    /> */}

                    <GridListTileBar
                      title={post.title}
                      subtitle={<span>by: {post.author}</span>}
                    />
                  </Link>
                </GridListTile>
              ))}
            </GridList>
          ) : null}
        </Container>
      </div>
    </>
  );
}

export default Posts;
