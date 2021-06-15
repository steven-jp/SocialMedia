import { useState, useEffect } from "react";
import { createPost } from "../../components/Post/Api";
import {
  makeStyles,
  TextField,
  Button,
  Grid,
  GridList,
  Container,
} from "@material-ui/core";
import SwipeableImages from "../Swipeable/SwipeableImages.js";
import { isLoggedIn } from "../Authentication/Api";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(219, 213, 212,.5)",
    borderRadius: "20px",
    height: "40vh",
    marginTop: "2px",
    boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.4)",
  },
  inputButton: {
    display: "none",
  },
  container: {
    height: "40vh",
  },
}));

const PostForm = () => {
  const MAX_IMAGES = 3;
  const classes = useStyles();
  const [postAttributes, setPostAttributes] = useState({
    title: "",
    author: "",
    images: [],
  });
  const [userData, setUserData] = useState(null);

  //get user information.
  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);

  //Update postAttributes when userData contains a valid object
  useEffect(() => {
    if (userData) {
      updatePostAttributes("author", userData.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const [uploadImages, setUploadImages] = useState([]);
  function changeFormHandler(e) {
    updatePostAttributes(e.target.name, e.target.value);
  }

  function submitFormHandler(e) {
    e.preventDefault();
    if (
      userData &&
      postAttributes.title.length > 0 &&
      uploadImages.length > 0
    ) {
      let formData = new FormData();
      uploadImages.forEach((img) => {
        formData.append("image", img);
      });
      formData.append("attributes", JSON.stringify(postAttributes));
      createPost(formData);
    }
  }

  function updatePostAttributes(name, value) {
    setPostAttributes({ ...postAttributes, [name]: value });
  }

  function onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let images = [];
      //Grab up to X images.
      for (let i = 0; i < e.target.files.length; i++) {
        const currentImage = e.target.files[i];
        if (i >= MAX_IMAGES) {
          break;
        }
        images.push(currentImage);
      }
      setUploadImages(images);
    }
  }
  const { title } = postAttributes;
  return (
    <form
      onSubmit={submitFormHandler}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <Container maxWidth="md">
        {/* <Grid container spacing={1} direction="row"> */}
        <GridList cols={2} className={classes.container}>
          <Grid
            container
            item
            direction="column"
            justify="center"
            alignItems="flex-start"
            cols={1}
            xs={2}
          >
            <Grid item xs>
              <TextField
                id="form-title"
                label="Title"
                name="title"
                value={title}
                InputLabelProps={{ required: true }}
                onChange={changeFormHandler}
              />
            </Grid>
            <Grid item xs>
              <input
                accept="image/*"
                id="upload-button"
                onChange={onImageChange}
                className={classes.inputButton}
                multiple
                type="file"
              />
              <label htmlFor="upload-button">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
            <Grid item xs>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={8}>
            <Grid item xs>
              <SwipeableImages images={uploadImages} />
            </Grid>
          </Grid>
        </GridList>
      </Container>
    </form>
  );
};

export default PostForm;
