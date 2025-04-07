// developer.service.ts 
// Handles database operations related to developer dashboard using prisma
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { subDays, startOfWeek, endOfWeek, startOfDay, endOfDay, getDay } from 'date-fns';
import { OpenAI } from "openai";

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const prisma = new PrismaClient();

export class DeveloperService {

    async getAllTasks(id: number) {
        // return await prisma.task.findMany({
        //     where: { assigneeId: id }
        // });

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

    async getCodeTime(devId: number, timePeriod: string) {
        const dateFilter = this.getDateFilter(timePeriod);

        // make skill codetime db
        // const codeTimeRecords = await prisma.codetime.findMany({
        //     where: {
        //         assigneeId: devId,
        //         createAt: dateFilter
        //     },
        //     take: 7,
        //     orderBy: {
        //         createAt: 'desc'
        //     }
        // });

        // // Process data to group by weekdays
        // const weeklyData = Array(7).fill(null).map((_, i) => ({
        //     weekDayIndex: i,  // Mon = 0, ..., Sun = 6
        //     totalTime: 0,
        //     qualityTime: 0,
        // }));

        // codeTimeRecords.forEach((record: any) => {
        //     const weekDayIndex = (getDay(record.createdAt) + 6) % 7; // Convert Sun=0 to Mon=0
        //     weeklyData[weekDayIndex].totalTime += record.totalTime;
        //     weeklyData[weekDayIndex].qualityTime += record.qualityTime;
        // });

        // return weeklyData;
    }

    async getTotalCodeTime(devId: number, timePeriod: string) {
        const dateFilter = this.getDateFilter(timePeriod);

        // make skill codetime db
        // const codeTimeRecords = await prisma.codetime.findMany({
        //     where: {
        //         assigneeId: devId,
        //         createAt: dateFilter
        //     },
        //     take: 7,
        //     orderBy: {
        //         createAt: 'desc'
        //     }
        // });

        // // Initialize total coding times
        // let totalQualityTime = 0;
        // let totalOtherTime = 0;

        // // Sum up all the times
        // codeTimeRecords.forEach((record: any) => {
        //     totalQualityTime += record.qualityTime;
        //     totalOtherTime += record.totalTime - record.qualityTime; // Other coding time
        // });

        // // Return formatted data
        // return [
        //     { id: "Quality Coding Time", value: totalQualityTime, color: "#02B2AF" },
        //     { id: "Other Coding Time", value: totalOtherTime, color: "#2E96FF" },
        // ];
    }

    async updateTaskStatus(id: number, data: any) {
        return await prisma.task.update({
            where: { id },
            data
        });
    }

    async getCodeAnalysis(code: string, userId: string) {
        let suggestData;
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini", // Or you can use gpt-4 if available
                messages: [
                    { 
                        role: "system", 
                        content: "You are a code reviewer that provides short, focused improvement tips"
                    }, 
                    { 
                        role: "user", 
                        content: `Here is a the code:\n\n${code}\n\nGive me only 2 suggestions. Each should include:
                        - "issueType":
                        - "description": a very short reason (max 14 words)

                        Respond with a 2D array of strings in the following format:
                        [
                        ["Issue Type", "Short Description"],
                        ["Issue Type", "Short Description"]
                        ]

                        Do not include anything else in the output` 
                    }
                ],
                temperature: 0.7,
                max_tokens: 150,
            });
            suggestData = response.choices[0].message.content
        } catch (error) {
            console.log(error);
        }

        if (suggestData) {
            suggestData = JSON.parse(suggestData);
        }

        const codeSuggestions = suggestData.map((suggestion: any) => ({
            userId: userId,
            issueType: suggestion[0],
            description: suggestion[1],
        }))

        console.log(codeSuggestions);
        
        try {
            const result = await prisma.codeSuggestion.createMany({
                data: codeSuggestions,
            });
            console.log('Suggestions inserted successfully: ', result);
        } catch (error) {
            console.error('Error inserting suggestions: ', error);
        }
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

    // private parseSuggestions(suggestions: string): { issueType: string; description: string }[] {
    //     const sug = suggestions.split('\n')
    //         .filter(line => line.includes(':'))
    //         .map(line => {
    //             const [issueType, ...descParts] = line.split(':');
    //             return {
    //                 issueType: issueType.trim(),
    //                 description: descParts.join(':').trim(),
    //             };
    //         });
        
    //     return sug
    //        // ignore empty or malformed lines
    //       .map(line => {
    //         const [issueType, ...descParts] = line.split(':');
    //         return {
    //           issueType: issueType.trim(),
    //           description: descParts.join(':').trim(),
    //         };
    //       });
    //   }
}