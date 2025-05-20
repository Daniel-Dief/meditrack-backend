import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UsersResolvers = {
  Query: {
    allUsers: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.users.findMany();
    },

    user: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.users.findFirst({
        where: { UserId: Number(args.id) }
      });
    },
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
