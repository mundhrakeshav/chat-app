import express from "express";
import { accessChat, addToGroup, createChatGroup, fetchChats, removeFromGroup, renameGroup } from "../controllers";
import { protect } from "../middleware/auth";

const router = express.Router()

router.route("/").all(protect).post(accessChat).get(fetchChats)
router.route("/group").post(protect, createChatGroup)
router.route("/rename").put(protect, renameGroup)
router.route("/add").put(protect, addToGroup)
router.route("/remove").put(protect, removeFromGroup)

export {router as chatRouter}