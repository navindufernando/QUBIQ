// server.ts 
// Entry point for the express server
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Sprintrouter from './routes/sprint.route';
import ProjectRouter from './routes/project.route';
import Taskrouter from './routes/task.route';
import MemberRoute from './routes/member.route';
import UserRouter from './routes/user.route';
import cors from 'cors';
import { MetricsClient } from '@prisma/client/runtime/library';
import PaymentRoute from './routes/payments';

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

// Mount user related routes
app.use('/user', UserRouter);

// Mount project related routes
app.use('/project', ProjectRouter);

// Mount project related routes
app.use('/task', Taskrouter);

// Mount member related routes
app.use('/member', MemberRoute);

// Mount sprint related routes
app.use('/sprint', Sprintrouter);

// Mount payment related routes
app.use("/api/payments", PaymentRoute);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Prisma with Express & Node!');
});

// Start the server on the port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});