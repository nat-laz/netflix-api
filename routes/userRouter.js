import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
  getUserStats,
} from "../controllers/userController.js";
import verify from "../middleware/verifyToken.js"

const router = express.Router();

router
.route("/find/:id")
.put(verify, updateUser)
.delete(verify, deleteUser)
.get(verify, getUser)

router.get("/", verify, getAllUser, getUserStats)

export default router;