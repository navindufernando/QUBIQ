import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MessageService {
  async sendMessage(senderId: string, receiverId: string, text: string) {
    return await prisma.message.create({
      data: {
        senderId,
        receiverId,
        text,
        createdAt: new Date(),
      },
    });
  }

  async getMessages(senderId: string, receiverId: string) {
    return await prisma.message.findMany({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });
  }

  async getChats(userId: string) {
    // Get all unique conversations
    const conversations = await prisma.$queryRaw`
      SELECT DISTINCT
        CASE 
          WHEN "senderId" = ${userId} THEN "receiverId"
          ELSE "senderId" 
        END as "participantId",
        MAX("createdAt") as "lastMessageTime"
      FROM "Message"
      WHERE "senderId" = ${userId} OR "receiverId" = ${userId}
      GROUP BY "participantId"
      ORDER BY "lastMessageTime" DESC
    `;

    // For each conversation, get the latest message and user info
    const chats = await Promise.all(
      // @ts-ignore - raw query typing issue
      conversations.map(async (conv) => {
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { senderId: userId, receiverId: conv.participantId },
              { senderId: conv.participantId, receiverId: userId },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        const participant = await prisma.user.findUnique({
          where: { id: conv.participantId },
          select: {
            id: true,
            name: true,
            lastSeen: true,
            // Add other user fields you want to display
          },
        });

        return {
          participant,
          lastMessage,
        };
      })
    );

    return chats;
  }

  async markAsRead(messageId: string) {
    return await prisma.message.update({
      where: { id: messageId },
      data: { isRead: true },
    });
  }
}

export default new MessageService();