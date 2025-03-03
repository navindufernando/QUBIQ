// server.ts 
// Entry point for the express server
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import sprintRoute from './features/sprints/sprint.route'; 
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

// Middleware to parse json requests
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Mount sprint related routes
app.use('/sprint', sprintRoute);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Prisma with Express & Node!');
});

// Start the server on the port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});