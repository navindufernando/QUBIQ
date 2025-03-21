import prisma from "../features/sprints/sprint.service";

class MessageService {
  async sendMessage(senderId: string, receiverId: string, text: string) {
    return await prisma.message.create({
      data: {
        senderId,
        receiverId,
        text,
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
}

export default new MessageService();
