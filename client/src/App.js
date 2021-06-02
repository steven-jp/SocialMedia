import { Container, Grid } from "@material-ui/core";
import PostForm from "./components/CreatePost/PostForm";
import Post from "./components/Post/Post";
import { getPosts } from "./Api";
function App() {
  let test = getPosts();
  return (
    <Container>
      <PostForm />
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Post />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Post />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Post />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
