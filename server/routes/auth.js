import express from "express";
import { loginUser, createUser, isLoggedIn } from "../controllers/auth.js";

export default function auth() {
  const router = express.Router();

  router.post("/login", loginUser);
  router.post("/register", createUser);
  router.get("/login", isLoggedIn);

  return router;
}
