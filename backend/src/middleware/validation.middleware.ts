import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

interface ValidationSchema {
  [key: string]: Joi.ObjectSchema;
}

const schemas: ValidationSchema = {
  signIn: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('DEV', 'PM').required()
  }),
  signUp: Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required(),
    role: Joi.string().valid('DEV', 'PM').required()
  }),
  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required()
  }),
  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().valid('DEV', 'PM').required()
  }),
  resetPassword: Joi.object({
    userId: Joi.string().required(),
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).required()
  }),
};

class ValidationMiddleware {
  static validate(schemaName: keyof ValidationSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const schema = schemas[schemaName];
      
      if (!schema) {
        res.status(500).json({ error: `Schema ${schemaName} not found` });
        return;
      }
      
      const { error } = schema.validate(req.body, { abortEarly: false });
      
      if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        res.status(400).json({ error: errorMessage });
        return;
      }
      
      next();
    };
  }
}

export default ValidationMiddleware;