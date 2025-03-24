import nodemailer from 'nodemailer';

// configure transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER || '601c39f9301492',
        pass: process.env.EMAIL_PASS || '07b17aa7622821',
    },
});

// base URL for client-side links
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Send password reset email
export const sendPswResetEmail = async (to: string, token: string, userId: string): Promise<void> => {
    const resetUrl = `${CLIENT_URL}/reset-password?token=${token}&userId=${userId}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@example.com',
        to,
        subject: 'Password Reset Request',
        html: `
            <h1>Password Reset</h1>
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>This link will expire in 1 hour</p>
            <p>If you didn't request this, please ignore this email.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${to}`);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
}

// Send email verification
export const sendVerificationEmail = async (to: string, token: string): Promise<void> => {
    const verifyUrl = `${CLIENT_URL}/email-verify?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@example.com',
        to,
        subject: 'Verify Your Email',
        html: `
            <h1>Email Verification</h1>
            <p>Thank you for registering. Please click the link below to verify your email:</p>
            <a href="${verifyUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>This link will expire in 24 hours</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${to}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
};

// send notification email
export const sendNotificationEmail = async (to: string, subject: string, message: string): Promise<void> => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@example.com',
        to,
        subject,
        html: `
            <h1>${subject}</h1>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${to}`);
    } catch (error) {
        console.error('Error sending notification email:', error);
        throw error;
    }
};