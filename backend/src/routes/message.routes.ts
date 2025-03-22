import { Router } from "express";
import { MessageController } from "../contollers/message.controller";

const router = Router();

// Send a new message
router.post("/", (req, res) => MessageController.sendMessage(req, res));

// Get messages between two users
router.get("/:senderId/:receiverId", (req, res) => MessageController.getMessages(req, res));

// Get all chats for a user
router.get("/chats/:userId", (req, res) => MessageController.getChats(req, res));

// Mark a message as read
router.put("/read/:messageId", (req, res) => MessageController.markAsRead(req, res));

export default router;