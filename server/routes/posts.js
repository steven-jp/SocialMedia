import express from "express";
import {
  getPosts,
  createPosts,
  getPostByID,
  updatePost,
  deletePost,
} from "../controllers/posts.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostByID);
router.post("/", createPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
