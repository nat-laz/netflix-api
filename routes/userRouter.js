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
.route("/:id")
.put(verify, updateUser)
.delete(verify, deleteUser)

router.get("/find/:id", verify, getUser)

router.get("/", verify, getAllUser)

router.get("/stats", getUserStats)

export default router;