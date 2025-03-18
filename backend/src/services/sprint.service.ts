// sprint.service.ts 
// Handles database operations related to sprints using prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SprintService {

    // creates a new sprint record in the database
    async createSprint(data: any) {
        return await prisma.sprint.create({ data });
    }

    // retrieves all sprint records
    async getAllSprints() {
        return await prisma.sprint.findMany();
    }

    // retrieves a sprint by it's ID
    async getSprintById(id: string) {
        return await prisma.sprint.findUnique({
            where: { id }
        });
    }

    // Updates an existing sprint using it's ID
    async updateSprint(id: string, data: any) {
        return await prisma.sprint.update({
            where: { id },
            data
        });
    }

    // Deletes a sprint using it's ID
    async deleteSprint(id: string) {
        return await prisma.sprint.delete({
            where: { id }
        });
    }
}