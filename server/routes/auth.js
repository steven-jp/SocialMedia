import express from "express";
import { loginUser, createUser } from "../controllers/auth.js";

export default function auth() {
  const router = express.Router();

  router.post("/login", loginUser);
  router.post("/register", createUser);

  return router;
}
