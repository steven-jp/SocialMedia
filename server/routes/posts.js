import express from "express";
import {
  createPosts,
  getPostsByUserIDs,
  updatePost,
  deletePost,
  addPostImages,
  getImagesByID,
} from "../controllers/posts.js";
import { verify } from "../controllers/verify.js";

export default function posts(uploads) {
  const router = express.Router();

  //Routes
  //Get all the posts and then get each image
  router.get("/image/:id", verify, getImagesByID);
  router.get("/", verify, getPostsByUserIDs);

  //Upload image and then create the post
  router.post("/", verify, uploads.array("image"), addPostImages);
  router.post("/", verify, createPosts);

  // not fully implemented below
  router.put("/:id", verify, updatePost);
  router.delete("/:id", verify, deletePost);

  return router;
}
