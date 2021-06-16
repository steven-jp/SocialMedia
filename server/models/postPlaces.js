import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const placesSchema = mongoose.Schema({
  title: String,
  author: String,
  userId: String,
  postId: String,
  likes: Number,
  images: [ObjectId],
  tags: [String],
  businessIDs: [String],
  createdAt: { type: Date, default: Date.now },
  destroy: String,
});

const PostPlaces = mongoose.model("PostPlaces", placesSchema);

export default PostPlaces;
