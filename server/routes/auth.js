import express from "express";
import {
  loginUser,
  createUser,
  isLoggedIn,
  getUserByName,
  addFriend,
  deleteFriend,
  logoutUser,
} from "../controllers/auth.js";

export default function auth() {
  const router = express.Router();

  router.post("/login", loginUser);
  router.get("/logout", logoutUser);
  router.post("/register", createUser);
  router.get("/login", isLoggedIn);
  router.get("/", getUserByName);
  router.post("/add", addFriend);
  router.post("/delete", deleteFriend);

  return router;
}
