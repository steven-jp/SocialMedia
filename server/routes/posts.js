import express from "express";
import {
  getPosts,
  createPosts,
  getPostsByUserIDs,
  updatePost,
  deletePost,
  addPostImages,
  getImagesByFilename,
  getImagesByID,
} from "../controllers/posts.js";
import { verify } from "../controllers/verify.js";

export default function posts(uploads) {
  const router = express.Router();

  //Routes
  // router.get("/image/:filename", getImagesByFilename);

  //Client calls getPosts which calls getImagesByID per image.
  router.get("/image/:id", verify, getImagesByID);
  // router.get("/", verify, getPosts);
  // router.get("/:userIds", verify, getPostsByUserIDs);
  router.get("/", verify, getPostsByUserIDs);

  //These call eachother
  router.post("/", verify, uploads.array("image"), addPostImages);
  router.post("/", verify, createPosts);

  router.put("/:id", verify, updatePost); // not fully imp
  router.delete("/:id", verify, deletePost); // not fully imp

  return router;
}
