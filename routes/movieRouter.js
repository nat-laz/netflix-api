import express from "express";
import { addMovie, updateMovie, deleteMovie, getMovie, getAllMovie, getRandomMovie } from "../controllers/movieController.js";
import verify from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/", verify, addMovie)

router
.route("/:id")
.put(verify, updateMovie)
.delete(verify, deleteMovie)

router.get("/find/:id", verify, getMovie)

router.get("/", verify, getAllMovie)

router.get("/random", verify, getRandomMovie)

export default router;