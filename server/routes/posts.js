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
  router.get("/image/:id", getImagesByID);
  router.get("/", getPosts);
  router.get("/:id", getPostByID);
  router.post("/", uploads.array("image"), addPostImages);
  router.post("/", createPosts);
  router.put("/:id", updatePost);
  router.delete("/:id", deletePost);

  return router;
}
