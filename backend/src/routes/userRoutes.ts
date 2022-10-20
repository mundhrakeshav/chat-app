import express from "express";
import { loginUser, registerUser, getUser } from "../controllers";

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// router.post("/login", loginUser)
router.route("/").get(getUser)

export {router as userRouter}