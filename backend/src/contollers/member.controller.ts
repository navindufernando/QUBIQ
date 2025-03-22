// member.controller.ts 
// Handles HTTP requests and responses for member
import { Request, Response } from "express";
import { MemberService } from "../services/member.service";

const memberService = new MemberService();

export class MemberController {
    static async createMember(req: Request, res: Response): Promise<any> {
        try {
            // extract the data from the request body
            const {
                name,
                email,
                role,
                projectId,
            } = req.body;

            // Validate necessary data
            if (!name || !email || !projectId) {
                return res.status(400).json({ error: 'Name, email, and projectId are required.' });
            }

            // Create a new member by calling the service method
            const newMember = await memberService.createMember({
                name,
                email,
                role,
                projectId,
            });

            // Respond with the created member
            res.status(201).json(newMember);
        } catch (error) {
            res.status(500).json({error: 'Failed to create a new member.'});
        }
    }

    // Controller method to retrieve all the members
    static async getAllMembers(req: Request, res: Response): Promise<any> {
        try {
            const members = await memberService.getAllMembers();
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the members.'});
        }
    } 

    // Controller method to retrieve a member by ID
    static async getMemberById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            // Convert the id from string to number
            const memberId = Number(id);

            // Check if the conversion was successful
            if (isNaN(memberId)) {
                return res.status(400).json({ error: 'Invalid ID format.' });
            }

            const member = await memberService.getMemberById(memberId);

            if (!member) {
                return res.status(404).json({error: 'Member not found.'});
            }

            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({error: 'Failed to fecth the member'});
        }
    }

        // Controller method to update a member by ID
    static async updateMember(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            // Convert the id from string to number
            const memberId = Number(id);

            // Check if the conversion was successful
            if (isNaN(memberId)) {
                return res.status(400).json({ error: 'Invalid ID format.' });
            }

            const member = await memberService.updateMember(memberId, req.body);

            if (!member) {
                return res.status(404).json({error: 'Member not found.'});
            }

            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({error: 'Failed to update the member'});
        }
    }

        // Controller method to delete a member by ID
    static async deleteMember(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            // Convert the id from string to number
            const memberId = Number(id);

            // Check if the conversion was successful
            if (isNaN(memberId)) {
                return res.status(400).json({ error: 'Invalid ID format.' });
            }

            const member = await memberService.deleteMember(memberId);

            if (!member) {
                return res.status(404).json({error: 'Member not found.'});
            }

            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({error: 'Failed to delete the member'});
        }
    }
}