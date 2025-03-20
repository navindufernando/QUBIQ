import { Router } from "express";
import { MemberController } from "../contollers/member.controller";

const MemberRoute = Router();

// Defines routes for sprint related operations (pm-dashboard)
MemberRoute.post('/', MemberController.createMember);
MemberRoute.get('/', MemberController.getAllMembers);
MemberRoute.get('/:id', MemberController.getMemberById);
MemberRoute.put('/:id', MemberController.updateMember);
MemberRoute.delete('/:id', MemberController.deleteMember);

export default MemberRoute;