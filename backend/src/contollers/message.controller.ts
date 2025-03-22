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
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  }

  static async getMessages(req: Request<{ senderId: string; receiverId: string }>, res: Response) {
    try {
      const { senderId, receiverId } = req.params;
      
      if (!senderId || !receiverId) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const messages = await messageService.getMessages(senderId, receiverId);
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }

  static async getChats(req: Request<{ userId: string }>, res: Response) {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const chats = await messageService.getChats(userId);
      res.status(200).json(chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ error: "Failed to fetch chats" });
    }
  }

  static async markAsRead(req: Request<{ messageId: string }>, res: Response) {
    try {
      const { messageId } = req.params;
      
      if (!messageId) {
        return res.status(400).json({ error: "Message ID is required" });
      }

      const updatedMessage = await messageService.markAsRead(messageId);
      res.status(200).json(updatedMessage);
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  }
}