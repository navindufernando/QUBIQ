// project.service.ts 
// Handles database operations related to projects using prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProjectService {

    // creates a new project record in the database
    async createProject(data: {
        projectName: string;
        description: string;
        startDate: Date;
        endDate: Date;
    }) {
        return await prisma.project.create({ data: {
            projectName: data.projectName,
            description: data.description,
            startDate: data.startDate.toISOString(),
            endDate: data.endDate.toISOString(),
        } });
    }

    // retrieves all project records
    async getAllProjects() {
        return await prisma.project.findMany();
    }

    // retrieves a project by it's ID
    async getProjectById(id: string) {
        return await prisma.project.findUnique({
            where: { id }
        });
    }

    // Updates an existing project using it's ID
    async updateProject(id: string, data: any) {
        return await prisma.project.update({
            where: { id },
            data
        });
    }

    // Deletes a project using it's ID
    async deleteProject(id: string) {
        return await prisma.project.delete({
            where: { id }
        });
    }
}