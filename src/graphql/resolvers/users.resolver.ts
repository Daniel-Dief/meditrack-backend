import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

interface CreateUserInput {
  Login: string;
  Password: string;
  UserTypeId: string;
  StatusId: string;
}

interface UpdateUserInput {
  Password?: string;
  UserTypeId?: string;
  StatusId?: string;
}

export const UsersResolvers = {
  Query: {
    allUsers: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.users.findMany();
    },

    user: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.users.findFirst({
        where: { UserId: parseInt(args.id, 10) }
      });
    },
  },

  Mutation: {
    createUser: async(_: any, args: { input: CreateUserInput }, context: { prisma: PrismaClient }) => {
      const { Login, Password, UserTypeId, StatusId } = args.input;

      const hashedPassword = createHash("md5").update(Password).digest("hex").toUpperCase();

      const UserTypeIdNum = parseInt(UserTypeId, 10);
      const StatusIdNum = parseInt(StatusId, 10);

      return context.prisma.users.create({
        data: {
          Login: Login,
          PasswordHash: hashedPassword,
          UserTypeId: UserTypeIdNum,
          StatusId: StatusIdNum
        }
      });
    },
    updateUser: async(_: any, args: { id: string, input: UpdateUserInput }, context: { prisma: PrismaClient }) => {
      const { Password, UserTypeId, StatusId } = args.input;

      let hashedPassword = undefined;

      if(Password) {
        hashedPassword = createHash("md5").update(Password).digest("hex").toUpperCase();
      }

      const UserTypeIdNum = UserTypeId ? parseInt(UserTypeId, 10) : undefined;
      const StatusIdNum = StatusId ? parseInt(StatusId, 10) : undefined;

      return context.prisma.users.update({
        where: { UserId: parseInt(args.id, 10) },
        data: {
          PasswordHash: hashedPassword,
          UserTypeId: UserTypeIdNum,
          StatusId: StatusIdNum
        }
      })
    },
    deleteUser: async(_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      const UserIdNum = parseInt(args.id, 10);

      await context.prisma.users.delete({
        where: { UserId: UserIdNum }
      })

      return true
    }
  },

  User: {
    UserType: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.usertypes.findFirst({
        where: { UserTypeId: parent.UserTypeId },
      });
    },

    Status: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.status.findFirst({
        where: { StatusId: parent.StatusId },
      })
    },

    Patient: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.patients.findFirst({
        where: { UserId: parent.UserId }
      });
    },

    Doctor: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.doctors.findFirst({
        where: { UserId: parent.UserId }
      });
    }
  }
};
