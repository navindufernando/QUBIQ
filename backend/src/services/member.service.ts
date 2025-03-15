// member.service.ts 
// Handles database operations related to members using prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MemberService {

    // creates a new member record in the database
    async createMember(data: {
        name: string;
        email: string;
        role?: string;
        projectId: string;
    }) {
        return await prisma.teamMember.create({ data: {
            name: data.name,
            email: data.email,
            role: data.role,
            projectId: data.projectId, 
        } });
    }

    // retrieves all member records
    async getAllMembers() {
        return await prisma.teamMember.findMany();
    }

    // retrieves a member by ID
    async getMemberById(id: number) {
        return await prisma.teamMember.findUnique({
            where: { id }
        });
    }

    // Updates an existing member using ID
    async updateMember(id: number, data: any) {
        return await prisma.teamMember.update({
            where: { id },
            data
        });
    }

    // Deletes a member using ID
    async deleteMember(id: number) {
        return await prisma.teamMember.delete({
            where: { id }
        });
    }
}