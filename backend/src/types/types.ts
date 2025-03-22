export enum UserRole {
    DEV = 'DEV',
    PM = 'PM',
    ADMIN = 'ADMIN'
}

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRole,
    emailVerified: boolean,
    verificationToken?: string | null,
    resetToken?: string | null,
    resetTokenExpiry?: Date | null,
    googleId?: string | null,
    createdAt: Date,
    updatedAt?: Date | null,
    teamMemberId?: number | null
}