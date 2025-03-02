// App setup
import express, { Express, Request, Response } from "express";
import cors from 'cors';

const app: Express = express();

app.use(cors());
// Middleware for parsing JSON
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


export default app;