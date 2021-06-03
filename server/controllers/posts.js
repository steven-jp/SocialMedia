import PostPlaces from "../models/postPlaces.js";

export const getPosts = async (req, res) => {
  try {
    let posts = await PostPlaces.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: "Error getting posts" });
  }
};

export const getPostByID = async (req, res) => {
  try {
    let posts = await PostPlaces.findById(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: "Error getting post with id" });
  }
};

export const createPosts = async (req, res) => {
  //   res.send("creae post!");
  let createPost = new PostPlaces(req.body);
  console.log(req);
  try {
    await createPost.save();
    res.status(200).json(createPost);
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
