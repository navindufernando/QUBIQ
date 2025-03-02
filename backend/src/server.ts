// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
// src/server.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});