import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();

router.post("/", MessageController.sendMessage);
router.get("/:senderId/:receiverId", MessageController.getMessages);

export default router;
