import {
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { getPostsByUserIds } from "../../components/Post/Api";
import SwipeableImages from "../../components/Swipeable/SwipeableImages";
import { Link } from "react-router-dom";

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

function Posts({ ids }) {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsByUserIds(setPosts, ids);
  }, [setPosts]);

  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="md">
          {posts ? (
            <GridList cellHeight={300} className={classes.gridElement}>
              {posts.map((post) => (
                <GridListTile key={post._id}>
                  <SwipeableImages images={post.images} />
                  <Link
                    to={{
                      pathname: `/posts/${post.author}/${post._id}`,
                      state: { post: post },
                    }}
                  >
                    <GridListTileBar
                      title={post.title}
                      component={"span"}
                      subtitle={
                        <Link
                          to={{
                            pathname: `/user/${post.author}`,
                            state: { author: post.author },
                          }}
                        >
                          by: {post.author}
                        </Link>
                      }
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
