// developer.service.ts 
// Handles database operations related to developer dashboard using prisma
import { PrismaClient } from "@prisma/client";
import { subDays, startOfWeek, endOfWeek, startOfDay, endOfDay, getDay } from 'date-fns';

const prisma = new PrismaClient();

export class DeveloperService {

    async getAllTasks(id: number) {
        return await prisma.task.findMany({
            where: { assigneeId: id }
        });
    }

    async getActivities() {
        // make activity db
        return await prisma.activity.findMany({
            take: 10,
            orderBy: {
                createAt: 'desc'
            }
        });
    }

    async getCodeImprovements() {
        // make code imp db
        return await prisma.codeimprovement.findMany({
            take: 10,
            orderBy: {
                createAt: 'desc'
            }
        });
    }

    async getSkillImprovements() {
        // make skill imp db
        return await prisma.skillimprovement.findMany({
            take: 10,
            orderBy: {
                createAt: 'desc'
            }
        });
    }

    async getCodeTime(devId: number, timePeriod: string) {
        const dateFilter = this.getDateFilter(timePeriod);

        // make skill codetime db
        const codeTimeRecords = await prisma.codetime.findMany({
            where: {
                assigneeId: devId,
                createAt: dateFilter
            },
            take: 7,
            orderBy: {
                createAt: 'desc'
            }
        });

        // Process data to group by weekdays
        const weeklyData = Array(7).fill(null).map((_, i) => ({
            weekDayIndex: i,  // Mon = 0, ..., Sun = 6
            totalTime: 0,
            qualityTime: 0,
        }));

        codeTimeRecords.forEach((record: any) => {
            const weekDayIndex = (getDay(record.createdAt) + 6) % 7; // Convert Sun=0 to Mon=0
            weeklyData[weekDayIndex].totalTime += record.totalTime;
            weeklyData[weekDayIndex].qualityTime += record.qualityTime;
        });

        return weeklyData;
    }

    async getTotalCodeTime(devId: number, timePeriod: string) {
        const dateFilter = this.getDateFilter(timePeriod);

        // make skill codetime db
        const codeTimeRecords = await prisma.codetime.findMany({
            where: {
                assigneeId: devId,
                createAt: dateFilter
            },
            take: 7,
            orderBy: {
                createAt: 'desc'
            }
        });

        // Initialize total coding times
        let totalQualityTime = 0;
        let totalOtherTime = 0;

        // Sum up all the times
        codeTimeRecords.forEach((record: any) => {
            totalQualityTime += record.qualityTime;
            totalOtherTime += record.totalTime - record.qualityTime; // Other coding time
        });

        // Return formatted data
        return [
            { id: "Quality Coding Time", value: totalQualityTime, color: "#02B2AF" },
            { id: "Other Coding Time", value: totalOtherTime, color: "#2E96FF" },
        ];
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
                dateFilter = {
                    gte: startOfWeek(subDays(today, 7)),
                    lte: endOfWeek(subDays(today, 7))
                };
                break;
            
            case 'this_week':
                dateFilter = {
                    gte: startOfWeek(today),
                    lte: endOfWeek(today)
                };
                break;

            default: 
                throw new Error("Invalid time period");
        }

        return dateFilter;
    }
}