// user.controller.ts

import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserRole } from "../types/types";
import { sendPswResetEmail } from "../utils/email";
import jwt from 'jsonwebtoken';

const service = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class UserController {

    static async signin(req: Request, res: Response): Promise<any> {
        try {
            const { email, password, role } = req.body;
            if (!email || !password || !role) {
                return res.status(400).json({ error: 'Email, password, and role are required'});
            }

            const user = await service.findUserByEmailAndRole(email, role as UserRole);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const isPasswordValid = await service.validatePassword(password, user.password || '');
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const { token, refreshToken } = service.generateTokens({
                id: user.id,
                email: user.email,
                role: user.role as UserRole
            });
            
            res.status(200).json({
                success: true,
                data: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    token,
                    refreshToken,
                },
            });
        } catch (error) {
            console.error('Sign in error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async signUp(req: Request, res: Response): Promise<any> {
        try {
            const { firstName, lastName, email, password, confirmPassword, role } = req.body;
            if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
                return res.status(400).json({ error: 'All fields are required'});
            }

            if(password !== confirmPassword) {
                return res.status(400).json({ error: 'Passwords do not match '});
            }

            const existingUser = await service.findUserByEmailAndRole(email, role as UserRole);
            if (existingUser) {
                return res.status(409).json({ error: 'User already exists with this email and role' });
            }

            const newUser = await service.createUser({
                firstName,
                lastName,
                email,
                password,
                role: role as UserRole,
            });

            const { token, refreshToken } = service.generateTokens({
                id: newUser.id,
                email: newUser.email,
                role: newUser.role as UserRole
            });
            
            res.status(200).json({
                success: true,
                data: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    role: newUser.role,
                    token,
                    refreshToken,
                },
                message: 'Account created successfully. Please check your email to verify your account'
            });
        } catch (error) {
            console.error('Sign up error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async forgotPassword(req: Request, res: Response): Promise<any> {
        try {
            const { email, role } =  req.body;

            if(!email || !role) {
                return res.status(400).json({ error: 'Email and role are required'});
            }

            const user = await service.findUserByEmailAndRole(email, role as UserRole);

            if (!user) {
                return res.status(200).json({
                    success: true,
                    message: 'If an account exists, a reset link will be sent to your email.'
                });
            }

            const resetToken = jwt.sign(
                { id: user.id },
                JWT_SECRET,
                { expiresIn: '1h' }
              );
          
            await service.updateUserResetToken(user.id, resetToken);
            await sendPswResetEmail(email, resetToken, user.id);
          
            res.status(200).json({ 
                success: true,
                message: 'Password reset instructions sent! Please check your email.' 
            });
        } catch (error) {
            console.error('Forgot password error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async resetPassword(req: Request, res: Response): Promise<any> {
        try {
            const { userId, token, newPassword } = req.body;
            
            if (!userId || !token || !newPassword) {
                return res.status(400).json({ error: 'User ID, token, and new password are required' });
            }
            
            const user = await service.findUserByResetToken(userId, token);
            
            if (!user) {
                return res.status(400).json({ error: 'Invalid or expired reset token' });
            }
            
            await service.updateUserPassword(userId, newPassword);
            
            res.status(200).json({
                success: true,
                message: 'Password reset successful'
            });
        } catch (error) {
            console.error('Reset password error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async refreshToken(req: Request, res: Response): Promise<any> {
        try {
            const { refreshToken } = req.body;
    
            if(!refreshToken) {
                return res.status(400).json({ error: 'Refresh token is required' });
            }
    
            try {
                const decoded = service.verifyRefreshToken(refreshToken);
                const user = await service.findUserById(decoded.id);
    
                if(!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
    
                // Generate both new access token and refresh token
                const { token, refreshToken: newRefreshToken } = service.generateTokens({
                    id: user.id,
                    email: user.email,
                    role: user.role as UserRole
                });
    
                res.status(200).json({
                    success: true,
                    data: { 
                        token, 
                        refreshToken: newRefreshToken 
                    }
                });
            } catch (error) {
                console.error('Token verification error:', error);
                return res.status(401).json({ error: 'Invalid or expired refresh token' });
            }
        } catch (error) {
            console.error('Refresh token error', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async googleAuth(req: Request, res: Response): Promise<any> {
        try {
            const { googleToken, role } = req.body;

            if(!googleToken || !role) {
                return res.status(400).json({ error: 'Google token and role are required' });
            }

            // In a real implementation, you would verify the googleToken
            // and extract user information from it
            const payLoad = {
                email: 'user-from-google@gmail.com',
                first_name: 'Google',
                last_name: 'User',
                sub: 'google-id-12345',
            };

            const user = await service.createOrUpdateGoogleUser({
                email: payLoad.email,
                firstName: payLoad.first_name,
                lastName: payLoad.last_name,
                googleId: payLoad.sub,
                role: role as UserRole
            });

            const { token, refreshToken } = service.generateTokens({
                id: user.id,
                email: user.email,
                role: user.role as UserRole
            });

            res.status(200).json({
                success: true,
                data: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    token,
                    refreshToken,
                },
            });
        } catch (error) {
            console.error('Google auth error: ', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async verifyemail(req: Request, res: Response): Promise<any> {
        try {
            const { token } = req.params;

            if(!token) {
                return res.status(400).json({error: 'Verification token is required' });
            }

            const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
            const user = await service.findUserByEmailTokenAndVerify(decoded.email, token);

            if (!user) {
                return res.status(400).json({ error: 'Invalid or expired verification token' });
            }

            res.status(200).json({
                success: true,
                message: 'Email verification successful'
            });
        } catch (error) {
            console.error('Email verification error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async changePassword(req: Request, res: Response): Promise<any> {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user?.id;

            if(!userId) {
                return res.status(401).json({ error: 'Not authenticated.' });
            }

            if(!currentPassword || !newPassword) {
                return res.status(400).json({ error: 'Current and New passwords are required' });
            }

            try {
                await service.changeUserPassword(userId, currentPassword, newPassword);
                
                res.status(200).json({ 
                  success: true,
                  message: 'Password changed successfully' 
                });
            } catch (error) {
                if (error instanceof Error) {
                  if (error.message === 'User not found') {
                    return res.status(404).json({ error: 'User not found' });
                  } else if (error.message === 'Current password is incorrect') {
                    return res.status(401).json({ error: 'Current password is incorrect' });
                  } else {
                    throw error;
                  }
                } else {
                  throw error;
                }
            }
        } catch (error) {
            console.error('Change password error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


