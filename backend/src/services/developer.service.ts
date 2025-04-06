// developer.service.ts 
// Handles database operations related to developer dashboard using prisma
import { PrismaClient } from "@prisma/client";
import { subDays, startOfWeek, endOfWeek, startOfDay, endOfDay, getDay } from 'date-fns';

const prisma = new PrismaClient();

export class DeveloperService {

    async getAllTasks(id: number) {

        const tasks = await prisma.task.findMany({
            where: { assigneeId: id },
            include: {
                assignee: {
                    select: {
                        name: true
                    }
                }
            }
        });

        // Format the dates in the `tasks` array
        const dateFormattedTasks = tasks.map(task => ({
            ...task,
            endDate: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : null,
            startDate: task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : null,
            assigneeName: task.assignee ? task.assignee.name : null,
            assignee: undefined
        }));

        return dateFormattedTasks;
    }

    async getActivities() {
        // make activity db
        // return await prisma.activity.findMany({
        //     take: 10,
        //     orderBy: {
        //         createAt: 'desc'
        //     }
        // });
    }

    async getCodeImprovements() {
        // make code imp db
        // return await prisma.codeimprovement.findMany({
        //     take: 10,
        //     orderBy: {
        //         createAt: 'desc'
        //     }
        // });
    }

    async getSkillImprovements() {
        // make skill imp db
        // return await prisma.skillimprovement.findMany({
        //     take: 10,
        //     orderBy: {
        //         createAt: 'desc'
        //     }
        // });
    }

    async getCodeTime(userId: string, timePeriod: string) {
        const dateFilter = this.getDateFilter(timePeriod);

        // make skill codetime db
        const codeTimeRecords = await prisma.codingTime.findMany({
            where: {
                userId: userId,
                date: dateFilter
            },
            take: 7,
            orderBy: {
                date: 'asc'
            }
        });

        return codeTimeRecords.map((record, i) => ({
            weekDayIndex: i,
            totalTime: parseFloat((record.totalCodingTimeMinutes / 60).toFixed(1)),
            qualityTime: parseFloat((record.qualityCodingTimeMinutes / 60).toFixed(1))
        }));
    }

    async getTotalCodeTime(userId: string, timePeriod: string) {
        const dateFilter = this.getDateFilter(timePeriod);

        // make skill codetime db
        const codeTimeRecords = await prisma.codingTime.findMany({
            where: {
                userId: userId,
                date: dateFilter
            },
            take: 7,
            orderBy: {
                date: 'asc'
            }
        });

        // Initialize total coding times
        let totalQualityTime = 0;
        let totalOtherTime = 0;

        // Sum up all the times
        codeTimeRecords.forEach((record: any) => {
            totalQualityTime += parseFloat((record.qualityCodingTimeMinutes / 60).toFixed(1));
            totalOtherTime += parseFloat(((record.totalCodingTimeMinutes - record.qualityCodingTimeMinutes) / 60).toFixed(1)); // Other coding time
        });

        // Return formatted data
        return [
            { id: "Quality Coding Time", value: totalQualityTime.toFixed(1), color: "#02B2AF" },
            { id: "Other Coding Time", value: totalOtherTime.toFixed(1), color: "#2E96FF" },
        ];
    }

    async updateTaskStatus(id: number, data: any) {
        return await prisma.task.update({
            where: { id },
            data
        });
    }

    // Helper func to get dateFilter
    private getDateFilter(timePeriod: string){
        let dateFilter: any = {};

        const today = new Date()

        switch (timePeriod) {
            case 'today':
                dateFilter = {
                    gte: startOfDay(today),
                    lte: endOfDay(today)
                };
                break;
            
            case 'yesterday':
                const yesterday = subDays(today, 1);
                dateFilter = {
                    gte: startOfDay(yesterday),
                    lte: endOfDay(yesterday)
                };
                break;

            case 'last_week':
                const lastWeekDate = subDays(today, 7);
                dateFilter = {
                    gte: startOfWeek(lastWeekDate, { weekStartsOn: 1 }),
                    lte: endOfWeek(lastWeekDate, { weekStartsOn: 1 })
                };
                break;
            
            case 'this_week':
                dateFilter = {
                    gte: startOfWeek(today, { weekStartsOn: 1 }),
                    lte: endOfWeek(today, { weekStartsOn: 1 })
                };
                break;

            default: 
                throw new Error("Invalid time period");
        }

        return dateFilter;
    }
}