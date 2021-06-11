import User from "../models/user.js";
import mongoose from "mongoose";

export const loginUser = async (req, res) => {
  // res.status(200).json({ message: "test" });
  try {
    //get image ids
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({ error: "Error getting posts" });
  }
};

export const createUser = async (req, res) => {
  // res.status(200).json({ message: "test" });

  try {
    //validate;
    // check;
    // let hashedPass = crypto.pbkdf2(
    //   req.body.password,
    //   "salt",
    //   100000,
    //   512,
    //   "sha512",
    //   (err, derivedKey) => {
    //     if (err) throw err;
    //     console.log(derivedKey); // '3745e48...aa39b34'
    //   },
    // );
    // create;
    let userAttributes = await JSON.parse(req.body);
    let user = new User({
      name: userAttributes.name,
      email: userAttributes.email,
      password: userAttributes.password,
    });
    let currentUser = await user.save();
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};
