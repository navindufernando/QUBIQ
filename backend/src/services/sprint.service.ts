// sprint.service.ts 
// Handles database operations related to sprints using prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SprintService {

    // Creates a new sprint record in the database
    async createSprint(data: any, userId: string) {
        try {
            // Handle possibly null projectId
            const { projectId, ...otherData } = data;
            
            const sprintData = {
                ...otherData,
                userId,
                // Only include projectId if it exists and is not null/undefined
                ...(projectId ? { projectId } : {})
            };
            
            console.log("Sprint data being sent to database:", sprintData);
            
            return await prisma.sprint.create({ 
                data: sprintData
            });
        } catch (error) {
            console.error("Database error in createSprint:", error);
            throw error; // Re-throw to be handled by the controller
        }
    }

    // retrieves all sprint records
    async getAllSprints(userId: string) {
        return await prisma.sprint.findMany({
            where: {
                userId
            }
        });
    }

    // retrieves a sprint by it's ID
    async getSprintById(id: string, userId: string) {
        return await prisma.sprint.findFirst({
            where: { 
                id,
                userId
            }
        });
    }

    // Updates an existing sprint using it's ID
    async updateSprint(id: string, userId: string, data: any) {
        const sprintdata = await prisma.sprint.findFirst({
            where: { id, userId },
        })

        if(!sprintdata){
            throw new Error("Sprint not found or doesn't belong to user");
        }

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

    async getActiveSprint(userId: string) {
        return await prisma.sprint.findFirst({
          where: {
            userId,
            status: 'In Progress'
          },
          orderBy: {
            startDate: 'desc' // optional: in case multiple sprints are 'In Progress'
          }
        });
      }
      
}