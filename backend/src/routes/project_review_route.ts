import { Router } from 'express';
import { ProjectReviewController } from '../contollers/project_review_controller';
import { ObjectiveController } from '../contollers/objective_controller';
import { RiskController } from '../contollers/risk_controller';
import { HighlightController } from '../contollers/highlight_controller';
import { FeedbackController } from '../contollers/feedback_controller';
import { CommunicationLogController } from '../contollers/communication_log_controller';
import { TeamInsightController } from '../contollers/team_insight_controller';
import AuthMiddleware from '../middleware/auth.middleware';
import { UserRole } from '../types/types';

const router = Router();
const projectReviewController = new ProjectReviewController();
const objectiveController = new ObjectiveController();
const riskController = new RiskController();
const highlightController = new HighlightController();
const feedbackController = new FeedbackController();
const communicationLogController = new CommunicationLogController();
const teamInsightController = new TeamInsightController();

router.post(
    '/',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    projectReviewController.createProjectReview.bind(projectReviewController)
);

router.get(
    '/:projectId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM, UserRole.DEV]),
    projectReviewController.getProjectReview.bind(projectReviewController)
);

router.get(
    '/',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM, UserRole.DEV]),
    projectReviewController.getAllProjectReviews.bind(projectReviewController)
);

router.put(
    '/:projectId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    projectReviewController.updateProjectReview.bind(projectReviewController)
);

router.delete(
    '/:projectId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    projectReviewController.deleteProjectReview.bind(projectReviewController)
);

router.post(
    '/:projectId/objectives',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    objectiveController.createObjective.bind(objectiveController)
);

router.put(
    '/objectives/:objectiveId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    objectiveController.updateObjective.bind(objectiveController)
);

router.delete(
    '/objectives/:objectiveId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    objectiveController.deleteObjective.bind(objectiveController)
);

router.post(
    '/:projectId/risks',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    riskController.createRisk.bind(riskController)
);

router.put(
    '/risks/:riskId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    riskController.updateRisk.bind(riskController)
);

router.delete(
    '/risks/:riskId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    riskController.deleteRisk.bind(riskController)
);

router.post(
    '/:projectId/highlights',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    highlightController.createHighlight.bind(highlightController)
);

router.put(
    '/highlights/:highlightId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    highlightController.updateHighlight.bind(highlightController)
);

router.delete(
    '/highlights/:highlightId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    highlightController.deleteHighlight.bind(highlightController)
);

router.post(
    '/:projectId/feedback',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM, UserRole.DEV]),
    feedbackController.createFeedback.bind(feedbackController)
);

router.put(
    '/feedback/:feedbackId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM, UserRole.DEV]),
    feedbackController.updateFeedback.bind(feedbackController)
);

router.delete(
    '/feedback/:feedbackId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM, UserRole.DEV]),
    feedbackController.deleteFeedback.bind(feedbackController)
);

router.post(
    '/feedback/:feedbackId/replies',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM, UserRole.DEV]),
    feedbackController.createReply.bind(feedbackController)
);

router.delete(
    '/replies/:replyId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM, UserRole.DEV]),
    feedbackController.deleteReply.bind(feedbackController)
);

router.post(
    '/:projectId/communication-logs',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    communicationLogController.createCommunicationLog.bind(communicationLogController)
);

router.delete(
    '/communication-logs/:logId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    communicationLogController.deleteCommunicationLog.bind(communicationLogController)
);

router.post(
    '/:projectId/team-insights',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    teamInsightController.createTeamInsight.bind(teamInsightController)
);

router.delete(
    '/team-insights/:insightId',
    AuthMiddleware.authenticate,
    AuthMiddleware.authorize([UserRole.PM]),
    teamInsightController.deleteTeamInsight.bind(teamInsightController)
);

export default router;