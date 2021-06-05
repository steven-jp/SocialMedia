import express from "express";
import {
  getPosts,
  createPosts,
  getPostByID,
  updatePost,
  deletePost,
  addPostImages,
} from "../controllers/posts.js";
import multer from "multer";

const router = express.Router();

//Storage of files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

//Routes
router.get("/", getPosts);
router.get("/:id", getPostByID);
router.post("/uploads", uploads.array("image"), addPostImages);
router.post("/", createPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
