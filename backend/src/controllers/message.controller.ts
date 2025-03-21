import { Request, Response } from "express";
import messageService from "../services/message.service";

export class MessageController {
  static async sendMessage(req: Request, res: Response) {
    try {
      const { senderId, receiverId, text } = req.body;
      if (!senderId || !receiverId || !text) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const message = await messageService.sendMessage(senderId, receiverId, text);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  }

  static async getMessages(req: Request<{ senderId: string; receiverId: string }>, res: Response) {
    try {
      const { senderId, receiverId } = req.params;

      // Ensure IDs are treated as strings or converted if needed
      const messages = await messageService.getMessages(senderId, receiverId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
}
