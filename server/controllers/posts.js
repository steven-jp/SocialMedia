import PostPlaces from "../models/postPlaces.js";
import { GridFS } from "../index.js";
import mongoose from "mongoose";

export const getImagesByFilename = async (req, res) => {
  try {
    let gridFs = GridFS();
    gridFs.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          message: "No posts exist",
        });
      }
      if (
        files[0].contentType === "image/jpeg" ||
        files[0].contentType === "image/png"
      ) {
        gridFs.openDownloadStreamByName(files[0].filename).pipe(res);
      } else {
        res
          .status(400)
          .json({ error: "Only jpeg and png images are supported" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: "Error getting posts" });
  }
};

async function getImage(id) {
  return new Promise((res, rej) => {
    let gridFs = GridFS();
    gridFs.find({ _id: mongoose.Types.ObjectId(id) }).toArray((err, files) => {
      if (err) rej(err);
      if (!files[0] || files.length === 0) {
        res(null);
      } else {
        res(files[0]);
      }
    });
  });
}

export const getImagesByID = async (req, res) => {
  try {
    let gridFs = GridFS();
    let image = await getImage(req.params.id);
    if (
      image.contentType === "image/jpeg" ||
      image.contentType === "image/png"
    ) {
      gridFs
        .openDownloadStream(mongoose.Types.ObjectId(req.params.id))
        .pipe(res);
    } else {
      res.status(400).json({ error: "Only jpeg and png images are supported" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error getting image" });
  }
};
export const getPosts = async (req, res) => {
  try {
    let posts = await PostPlaces.find();
    //get image ids
    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(400).json({ error: "Error getting posts" });
  }
};
export const getPostByID = async (req, res) => {
  let imagesIds = [];
  let posts = await PostPlaces.findById(req.params.id);

  //get image ids
  imagesIds = posts.images;
  let gridFs = GridFS();
  gridFs.find({ _id: { $in: imagesIds } }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        message: "This file doesn't exist",
      });
    }
    res.status(200).json({
      file: files[0],
    });
  });
};

export const addPostImages = async (req, res, next) => {
  try {
    let imageIds = [];
    let images = await req.files;
    images.forEach((img) => {
      imageIds.push(img.id);
    });
    req.body.imageIds = imageIds;
    //This won't be be hit because of front end limitation
    if (imageIds.length === 0) {
      res.status(200).json({
        message: "Posts must contain at least 1 image",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ error: "Error creating post" });
  }
};

export const createPosts = async (req, res) => {
  try {
    let postAttributes = await JSON.parse(req.body.attributes);
    postAttributes.images = req.body.imageIds;
    let createPost = new PostPlaces(postAttributes);
    await createPost.save();
    res.status(200).json({ msg: "Successfully created a post" });
  } catch (error) {
    res.status(400).json({ error: "Error creating post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    let posts = await PostPlaces.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    await PostPlaces.remove({ _id: req.params.id });
    res.status(200).json({ message: "Successful delete of Post" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting post" });
  }
};
