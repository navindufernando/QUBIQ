import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserRole } from '../types/types';
import rateLimit from 'express-rate-limit';
import { UserService } from '../services/user.service';

const prisma = new PrismaClient();
const service = new UserService();

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

class AuthMiddleware {
  static async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const decoded = service.verifyToken(token);
      const user = await service.findUserById(decoded.id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role as UserRole,
      };

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  }

  static authorize(roles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      if (!roles.includes(req.user.role)) {
        res.status(403).json({ message: 'Not authorized' });
        return;
      }

      next();
    };
  }

  static async requireVerifiedEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { emailVerified: true },
      });

      if (!user || !user.emailVerified) {
        res.status(403).json({ message: 'Email verification required' });
        return;
      }

      next();
    } catch (error) {
      console.error('Email verification check error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

export default AuthMiddleware;