import User from "../models/user.js";
import dotenv from "dotenv";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";

const COOKIE_MAX_AGE = 86400;
const COOKIE_NAME = "Occassions-cookie";

export const loginUser = async (req, res) => {
  try {
    let userAttributes = req.body;

    //check if a registered user
    let validEmail = await User.findOne({ email: userAttributes.email });
    if (!validEmail) {
      res.status(400).json({ error: "Email or password is incorrect" });
      return;
    }

    //Compare password hashes
    if (validEmail) {
      let hashedPass = hashPassword(userAttributes.password);
      if (validEmail.password === hashedPass) {
        createTokenAndCookie(res, req, validEmail._id);
        res
          .status(200)
          .json({ message: "Successful login", id: validEmail._id });
        return;
      }
      res.status(400).json({ error: "Email or password is incorrect" });
      return;
    }

    res.status(400).json({ error: "Email was not found" });
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
  let userAttributes = req.body;

  try {
    //check password length before hashing
    if (
      userAttributes.password.length < 8 ||
      userAttributes.password.length > 100
    ) {
      res
        .status(400)
        .json({ error: "The password must be between 8 and 100 characters." });
      return;
    }
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

    // check if passwords match
    if (userAttributes.password !== userAttributes.confirmedPassword) {
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }
    // password hashing
    let hashedPass = hashPassword(userAttributes.password);

    //create user
    let user = new User({
      username: userAttributes.username,
      email: userAttributes.email,
      password: hashedPass,
    });
    //save to db
    try {
      let currentUser = await user.save();
      createTokenAndCookie(res, req, user._id);
      res
        .status(200)
        .json({ message: "Successfully created user", id: user._id });
    } catch (error) {
      //validators check
      let errMsg = updateErrorMessage(error);
      res.status(400).json(errMsg);
    }
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

export const isLoggedIn = async (req, res) => {
  dotenv.config();

  const token = req.cookies[COOKIE_NAME];
  if (token) {
    jwt.verify(token, process.env.COOKIE_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ error: "User is not logged in" });
      } else {
        let userId = decodedToken.id;
        await User.findById(userId, (err, user) => {
          if (err) {
            res.status(400).json({ error: "User is not logged in" });
          } else {
            res
              .status(200)
              .json({ email: user.email, username: user.username });
          }
        });
      }
    });
  } else {
    res.status(400).json({ message: "User is not logged in" });
  }
};

// update error message if a part of mongo validators.
function updateErrorMessage(err) {
  if (err.message.includes("Users validation failed: ")) {
    let regexExp =
      /(Users validation failed: |password: |username: |email: )/gi;
    let result = err.message.replaceAll(regexExp, "");
    result = result.split(", ");
    return result;
  }
  return err;
}

//Creates a token and cookie valid for 1 day
function createTokenAndCookie(res, req, id) {
  dotenv.config();
  let token = jwt.sign({ id }, process.env.COOKIE_SECRET, {
    expiresIn: COOKIE_MAX_AGE,
  });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: process.env.PROD_ENV === true ? true : false,
    secure: process.env.PROD_ENV === true ? true : false,
    maxAge: COOKIE_MAX_AGE,
  });
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
}
