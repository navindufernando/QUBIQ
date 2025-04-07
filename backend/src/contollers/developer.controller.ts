// developer.controller.ts 
// Handles HTTP requests and responses for developer dashboard
import { Request, Response } from "express";
import { DeveloperService } from "../services/developer.service";

const developerService = new DeveloperService();

export class DeveloperController {

    //@desc     Get all tasks for the developer
    //@route    GET /dev/tasks
    //@access   public
    static async getAllTasks(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.query.userId as string;

            const tasks = await developerService.getAllTasks(userId);
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch the tasks'});
        }
    }

    //@desc     Get recent activites
    //@route    GET /dev/activities
    //@access   public
    static async getActivities(req: Request, res: Response): Promise<any> {
        try{
            const activities = await developerService.getActivities();
            res.status(200).json(activities);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the activities'});
        }
    }

    //@desc     Get code improvements
    //@route    GET /dev/codeimp
    //@access   public
    static async getCodeImprovements(req: Request, res: Response): Promise<any> {
        try{
            const userId = req.query.userId as string;
            const codeImprovements = await developerService.getCodeImprovements(userId);
            console.log(codeImprovements);
            console.log(userId);
            res.status(200).json(codeImprovements);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the code improvements'});
        }
    }


    //@desc     Get skill improvements
    //@route    GET /dev/skillimp
    //@access   public
    static async getSkillImprovements(req: Request, res: Response): Promise<any> {
        try{
            const skillImprovements = await developerService.getSkillImprovements();
            res.status(200).json(skillImprovements);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the skill improvements'});
        }
    }

    //@desc     Get coding time for the developer
    //@route    GET /dev/codetime
    //@access   public
    static async getCodeTime(req: Request, res: Response): Promise<any> {
        try{
            const userId = req.query.userId as string;
            const timePeriod = req.query.timePeriod as string;
            const codeTime = await developerService.getCodeTime(userId, timePeriod);
            res.status(200).json(codeTime);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the code time'});
        }
    }

    //@desc     Get total coding time for the developer in the selected period
    //@route    GET /dev/codetime-total
    //@access   public
    static async getTotalCodeTime(req: Request, res: Response): Promise<any> {
        try{
            const userId = req.query.userId as string;
            const timePeriod = req.query.timePeriod as string;
            const totalCodeTime = await developerService.getTotalCodeTime(userId, timePeriod);
            res.status(200).json(totalCodeTime);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the total code time'});
        }
    }

    //@desc     Get total coding time for the developer in the selected period
    //@route    GET /dev/codetimeinsight
    //@access   public
    static async getCodeTimeInsight(req: Request, res: Response): Promise<any> {
        try{
            const userId = req.query.userId as string;
            const timePeriod = req.query.timePeriod as string;
            const codeTimeInsight = await developerService.getCodeTimeInsight(userId, timePeriod);
            res.status(200).json(codeTimeInsight);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the total code time insight'});
        }
    }

    //@desc     Get all the sprints for the developer
    //@route    GET /dev/sprints
    //@access   public
    static async getSprintsForDeveloper(req: Request, res: Response): Promise<any> {
        try{
            const userId = req.query.userId as string;
            const timePeriod = req.query.timePeriod as string;
            const sprints = await developerService.getSprintsForDeveloper(userId, timePeriod);
            res.status(200).json(sprints);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the sprints'});
        }
    }

    //@desc     Update status of the task
    //@route    PUT /dev/tasks/:id
    //@access   public
    static async updateTaskStatus(req: Request, res: Response): Promise<any> {
        try{
            const { id } = req.params;
            const taskId = Number(id);

            if (isNaN(taskId)) {
                return res.status(400).json({ error: 'Invalid ID format.' });
            }

            const task = await developerService.updateTaskStatus(taskId, req.body);

            if (!task) {
                return res.status(404).json({error: 'Member not found.'});
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the sprints'});
        }
    }

    //@desc     Post code of the developer for analysis
    //@route    POST /dev/devcode
    //@access   public
    static async getCodeAnalysis(req: Request, res: Response): Promise<any> {
        try{
            const { code } = req.body;
            const userId = "4ab789e9-63ff-4f10-b6c7-8003930cceed";
            await developerService.getCodeAnalysis(code, userId);
            res.status(200);
        } catch (error) {
            res.status(500).json({ error: 'Failed to analyse the code'});
        }
    }
}