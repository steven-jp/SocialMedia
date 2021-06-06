import express from "express";
import {
  getPosts,
  createPosts,
  getPostByID,
  updatePost,
  deletePost,
  addPostImages,
} from "../controllers/posts.js";

export default function posts(gridFs, uploads) {
  const router = express.Router();

  //Routes
  router.get("/", getPosts);
  router.get("/:id", getPostByID);
  router.post("/uploads", uploads.array("image"), addPostImages);
  router.post("/", createPosts);
  router.put("/:id", updatePost);
  router.delete("/:id", deletePost);

  return router;
}
