import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import posts from "./routes/posts.js";
import auth from "./routes/auth.js";
import multer from "multer";
import * as crypto from "crypto";
import GridFsStorage from "multer-gridfs-storage";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

const CONNECTION = process.env.DB_CONNECTION;
let gridFs;
mongoose
  .connect(CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server now running on port ${port}!`));
    gridFs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
  })
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);

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
app.use("/user", auth());

app.use("/posts", posts(uploads));

export function GridFS() {
  gridFs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
  return gridFs;
}
