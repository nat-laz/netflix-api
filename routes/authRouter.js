import express from "express";
import {
  signupController,
  signinController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", signupController);

router.post("/login", signinController);

export default router;
