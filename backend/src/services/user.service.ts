import prisma from "../features/sprints/sprint.service";
import bcrypt from "bcrypt";

class UserService {
  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }
}

export default new UserService();
