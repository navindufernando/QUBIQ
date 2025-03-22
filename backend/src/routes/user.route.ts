import express from 'express';
import AuthMiddleware, { authRateLimiter } from '../middleware/auth.middleware';
import ValidationMiddleware from '../middleware/validation.middleware';
import { UserController } from '../contollers/user.controller';

const UserRouter = express.Router();

// Authentication routes
UserRouter.post('/signin', authRateLimiter, ValidationMiddleware.validate('signIn'), UserController.signin);
UserRouter.post('/signup', ValidationMiddleware.validate('signUp'), UserController.signUp);
UserRouter.post('/forgot-password', authRateLimiter, ValidationMiddleware.validate('forgotPassword'), UserController.forgotPassword);
UserRouter.post('/reset-password', ValidationMiddleware.validate('resetPassword'), UserController.resetPassword);
UserRouter.post('/refresh-token', UserController.refreshToken);
UserRouter.post('/google-auth', UserController.googleAuth);
UserRouter.get('/verify-email/:token', UserController.verifyemail);

// Protected routes (require authentication)
UserRouter.post('/change-password', 
  AuthMiddleware.authenticate, 
  ValidationMiddleware.validate('changePassword'), 
  UserController.changePassword
);

export default UserRouter;