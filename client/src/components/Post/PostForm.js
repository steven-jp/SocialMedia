import React, { useState } from "react";
import { createPost } from "../../components/Post/Api";
import {
  makeStyles,
  TextField,
  Button,
  Grid,
  GridList,
} from "@material-ui/core";
import SwipeableImages from "../Swipeable/SwipeableImages.js";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(219, 213, 212,.5)",
    borderRadius: "20px",
    height: "40vh",
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
  });

  const [uploadImages, setUploadImages] = useState([]);
  function changeFormHandler(e) {
    updatePostAttributes(e.target.name, e.target.value);
  }

  //add so that 1 photo must be present
  function submitFormHandler(e) {
    e.preventDefault();
    if (postAttributes.title.length > 0 && uploadImages.length > 0) {
      let formData = new FormData();
      uploadImages.forEach((img) => {
        formData.append("image", img);
      });
      // createPost(formValues);
      createPost(formData, postAttributes);
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
    </form>
  );
};

export default PostForm;