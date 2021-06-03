import React, { useState } from "react";
import { createPost } from "../../components/Post/Api";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(219, 213, 212,.5)",
    borderRadius: "20px",
    height: "50vh",
  },
}));

const PostForm = () => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    title: "",
  });

  function changeFormHandler(e) {
    setFormValues({ [e.target.name]: e.target.value });
  }

  function submitFormHandler(e) {
    e.preventDefault();
    createPost(formValues);
  }

  const { title } = formValues;

  return (
    // <h1>POST Form !!!!</h1>
    <form
      onSubmit={submitFormHandler}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Title"
        value={title}
        InputLabelProps={{ required: true }}
        onChange={changeFormHandler}
      />
      {/* <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={changeFormHandler}
      /> */}
      <button> Submit</button>
    </form>
  );
};

export default PostForm;
