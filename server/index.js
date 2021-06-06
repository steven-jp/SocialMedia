import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import posts from "./routes/posts.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Routes
app.use("/posts", posts);

const CONNECTION = process.env.DB_CONNECTION;
let gfs;
mongoose
  .connect(CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server now running on port ${port}!`));
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
      bucketName: "uploads",
    });
  })
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);

export default gfs;
