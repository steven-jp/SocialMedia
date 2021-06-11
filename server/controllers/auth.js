import User from "../models/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as crypto from "crypto";
import { nextTick } from "process";

export const loginUser = async (req, res) => {
  try {
    let userAttributes = req.body;

    let validEmail = await User.findOne({ email: userAttributes.email });
    if (!validEmail) {
      res.status(400).json({ error: "Email or password is incorrect" });
      return;
    }

    //Compare password hashes
    if (validEmail) {
      let hashedPass = hashPassword(userAttributes.password);
      if (validEmail.password === hashedPass) {
        res.status(200).json({ message: "Successful login" });
        return;
      }
      res.status(400).json({ error: "Email or password is incorrect" });
      return;
    }

    res.status(200).json({ messsage: "Success!!" });
  } catch (error) {
    res.status(400).json({ error: "Error getting user" });
  }
};

function hashPassword(password) {
  dotenv.config();

  return crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT, 100000, 512, "sha512")
    .toString("hex");
}

export const createUser = async (req, res) => {
  // res.status(200).json({ message: "test" });
  let userAttributes = req.body;

  try {
    // check existing user;
    let emailExists = await User.findOne({ email: userAttributes.email });
    if (emailExists) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }
    let usernameExists = await User.findOne({
      username: userAttributes.username,
    });
    if (usernameExists) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    //  Password Hashing
    let hashedPass = hashPassword(userAttributes.password);

    //Create User
    let user = new User({
      username: userAttributes.username,
      email: userAttributes.email,
      password: hashedPass,
    });

    //Save to db
    try {
      let currentUser = await user.save();
      res.status(200).json({ message: "Successfully created user" });
    } catch {
      res.status(400).json({ error: "Error creating user" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};
