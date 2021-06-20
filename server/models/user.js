import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username."],
    unique: [true, "This username already exists."],
    minlength: [6, "The username must be at least 6 characters."],
    maxlength: [20, "The username can be at most 20 characters."],
  },
  email: {
    required: [true, "Please enter an email."],
    unique: [true, "This email already exists."],
    minlength: [3, "The email must be at least 3 characters."],
    maxlength: [320, "The email can be at most 320 characters."],
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
  },
  friends: [String],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("Users", userSchema);

export default User;
