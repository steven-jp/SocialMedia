import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const COOKIE_NAME = "Occassions-cookie";

export const verify = (req, res, next) => {
  dotenv.config();
  const token = req.cookies[COOKIE_NAME];
  if (token) {
    jwt.verify(token, process.env.COOKIE_SECRET, (err) => {
      if (err) {
        res.status(400).json({ error: "Couldn't verify token" });
        return;
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ error: "No token is present" });
    return;
  }
};
