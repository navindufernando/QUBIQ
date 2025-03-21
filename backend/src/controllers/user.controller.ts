import { Request, Response } from "express";
import userService from "../services/user.service";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "User registration failed" });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
}
