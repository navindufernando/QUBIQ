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

    // retrieves all task records grouped by status
    async getTaskByCount(projectId: string) {
        return await prisma.task.findMany({
            where: { projectId: projectId },
            select: { status: true, endDate: true, startDate: true }
        }).then(tasks => ({
            completedTasks: tasks.filter(task => task.status === 'Completed').length,
            pendingTasks: tasks.filter(task => task.status === 'Pending').length,
            inProgressTasks: tasks.filter(task => task.status === 'inProgress').length,
            overdueTasks: tasks.filter(task => task.endDate && new Date(task.endDate) < new Date() && task.status !== 'Completed').length,   
        }))
    }

    // retrieves all task records in a particular project in a sprint
    async getTasksForProjectInSprint(projectId: string, sprintId: string) {
        const sprint = await prisma.sprint.findUnique({
            where: { id: sprintId, projectId: projectId },
            select: {
                startDate: true,
                endDate: true
            }
        });

        if (!sprint) {
            throw new Error('Sprint not found');
        }

        return await prisma.task.findMany({
            where: {
                projectId: projectId,
                sprintId: sprintId
            },
            include: {
                assignee: true,
            }
        })
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