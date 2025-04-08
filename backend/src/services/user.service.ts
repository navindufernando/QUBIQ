import { PrismaClient, UserRole as PrismaUserRole, Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRole } from "src/types/types";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret-key';

export class UserService {
    async findUserByEmailAndRole(email: string, role: UserRole) {
        return await prisma.user.findFirst({
            where: { email, role: role as PrismaUserRole }
        });
    }

    async createUser(data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: UserRole;
    }) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const verificationToken = jwt.sign({ email: data.email }, JWT_SECRET, { expiresIn: '356d' });

        return await prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                role: data.role as PrismaUserRole,
                emailVerified: false,
                verificationToken: verificationToken!
            }
        });
    }

    async validatePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    generateTokens = (user: { id: string, email: string, role: UserRole }) => {
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '356d' }
        );
        const refreshToken = jwt.sign(
            { id: user.id },
            REFRESH_SECRET,
            { expiresIn: '356d' }
        );
        return { token, refreshToken }
    }

    async updateUserResetToken(userId: string, resetToken: string) {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                resetToken,
                resetTokenExpiry: new Date(Date.now() + 3600000),
            },
        });
    }

    async findUserByResetToken(userId: string, token: string) {
        return await prisma.user.findFirst({
            where: {
                id: userId,
                resetToken: token,
                resetTokenExpiry: { gt: new Date() },
            },
        });
    }

    async updateUserPassword(userId: string, newPassword: string) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        return await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
    }

    async findUserById(userId: string) {
        return await prisma.user.findUnique({
            where: { id: userId },
        });
    }

    verifyRefreshToken = (refreshToken: string) => {
        return jwt.verify(refreshToken, REFRESH_SECRET) as { id: string };
    };

    verifyToken = (token: string) => {
        return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: UserRole };
    };

    async findUserByEmailTokenAndVerify(email: string, token: string) {
        const user = await prisma.user.findFirst({
            where: { email, verificationToken: token },
        });

        if (user) {
            return await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: true, verificationToken: null },
            });
        }
    }

    async createOrUpdateGoogleUser(data: {
        email: string;
        firstName: string;
        lastName: string;
        googleId: string;
        role: UserRole;
    }) {
        const existingUser = await this.findUserByEmailAndRole(data.email, data.role);
        if (!existingUser) {
            return await prisma.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: '',
                    role: data.role as PrismaUserRole,
                    googleId: data.googleId,
                    emailVerified: true,
                },
            });
        } else if (!existingUser.googleId) {
            return await prisma.user.update({
                where: { id: existingUser.id },
                data: { googleId: data.googleId },
            });
        }
        return existingUser;
    }

    async changeUserPassword(userId: string, currentPassword: string, newPassword: string) {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.validatePassword(currentPassword, user.password || '');
        if (!isPasswordValid) {
            throw new Error('Current password is incorrect');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        return await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    }

    async updateUserProfile(userId: string, data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        bio?: string;
        city?: string;
        country?: string;
        role?: UserRole;
        team?: string;
        project?: string;
    }) {
        // Create a properly typed update object
        const updateData: Prisma.UserUpdateInput = {};

        if (data.firstName !== undefined) updateData.firstName = data.firstName;
        if (data.lastName !== undefined) updateData.lastName = data.lastName;
        if (data.email !== undefined) updateData.email = data.email;
        if (data.bio !== undefined) updateData.bio = data.bio;
        if (data.city !== undefined) updateData.city = data.city;
        if (data.country !== undefined) updateData.country = data.country;
        if (data.team !== undefined) updateData.team = data.team;
        if (data.project !== undefined) updateData.project = data.project;

        // Handle phone separately since it might be causing issues
        if (data.phone !== undefined) {
            (updateData as any).phone = data.phone;
        }

        // Handle role separately as it needs type conversion
        if (data.role !== undefined) {
            updateData.role = data.role as PrismaUserRole;
        }

        return await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
    }

    async updateUserPicture(userId: string, picture: string) {
        // Use a cast to get around the type checking for this specific field
        const updateData: Prisma.UserUpdateInput = {};
        (updateData as any).picture = picture;

        return await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
    }
}