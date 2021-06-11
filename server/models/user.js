import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: [6, "Username must be at least 6 characters"],
    max: [20, "Username cannot be longer than 20 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: [3, "Email must be at least 3 characters"],
    max: [320, "Email cannot be longer than 320 characters"],
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password must be at least 8 characters"],
    max: [320, "Password cannot be longer than 100 characters"],
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("Users", userSchema);

export default User;
