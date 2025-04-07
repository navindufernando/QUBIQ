import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Sprintrouter from './routes/sprint.route';
import ProjectRouter from './routes/project.route';
import Taskrouter from './routes/task.route';
import MemberRoute from './routes/member.route';
import DeveloperRouter from './routes/developer.route';
import UserRouter from './routes/user.route';
import ProjectReviewRouter from './routes/project_review_route';
import cors from 'cors';
import PaymentRoute from './routes/payments';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/user', UserRouter);
app.use('/project', ProjectRouter);
app.use('/project-review', ProjectReviewRouter);
app.use('/task', Taskrouter);
app.use('/member', MemberRoute);
app.use('/sprint', Sprintrouter);
app.use('/dev', DeveloperRouter);
app.use("/api/payments", PaymentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Prisma with Express & Node!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});