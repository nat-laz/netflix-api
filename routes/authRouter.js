import express from "express"
import {signupController} from "../controllers/authController.js"

const router = express.Router()

//REGISTER
router.post("/register", signupController)

export default router;