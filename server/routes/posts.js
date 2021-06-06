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
import * as crypto from "crypto";
import GridFsStorage from "multer-gridfs-storage";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const router = express.Router();
const CONNECTION = process.env.DB_CONNECTION;

// //Storage of files on server
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

//Storage of files on mongo.
const storage = new GridFsStorage({
  url: CONNECTION,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
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
