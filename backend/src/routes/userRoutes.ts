import express from "express";
import { loginUser, registerUser } from "../controllers";

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// router.post("/login", loginUser)

export {router as userRouter}