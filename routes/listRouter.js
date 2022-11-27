import express from "express";
import {
  createList,
  deleteList,
  getList,
  updateList,
} from "../controllers/listController.js";
import verify from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verify, createList);

router
.route("/:id")
.put(verify, updateList)
.delete(verify, deleteList);

router.get("/", verify, getList);

export default router;
