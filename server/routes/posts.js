import express from "express";
import {
  getPosts,
  createPosts,
  getPostByID,
  updatePost,
  deletePost,
  addPostImages,
  getImagesByFilename,
  getImagesByID,
} from "../controllers/posts.js";

export default function posts(uploads) {
  const router = express.Router();

  //Routes
  // router.get("/image/:filename", getImagesByFilename);

  //Client calls getPosts which calls getImagesByID per image.
  router.get("/image/:id", getImagesByID);
  router.get("/", getPosts);
  // router.get("/:id", getPostByID);

  //These call eachother
  router.post("/", uploads.array("image"), addPostImages);
  router.post("/", createPosts);

  router.put("/:id", updatePost); // not fully imp
  router.delete("/:id", deletePost); // not fully imp

  return router;
}
