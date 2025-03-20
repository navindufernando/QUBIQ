// task.service.ts 
// Handles database operations related to tasks using prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TaskService {

    // creates a new task record in the database
    async createTask(data: any) {
        return await prisma.task.create({ data });
    }

    // retrieves all task records
    async getAllTasks() {
        return await prisma.task.findMany();
    }

    // retrieves a task by it's ID
    async getTaskById(id: number) {
        return await prisma.task.findUnique({
            where: { id }
        });
    }

    // Updates an existing task using it's ID
    async updateTask(id: number, data: any) {
        return await prisma.task.update({
            where: { id },
            data
        });
    }

    // Deletes a task using it's ID
    async deleteTask(id: number) {
        return await prisma.task.delete({
            where: { id }
        });
    }
}