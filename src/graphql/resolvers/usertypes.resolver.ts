import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserTypesResolvers = {
  Query: {
    allUserTypes: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.usertypes.findMany();
    },

    userType: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.usertypes.findFirst({
        where: { UserTypeId: Number(args.id) }
      });
    },
  },

  UserType: {
    Users: async (parent: { UserTypeId: number }, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.users.findMany({
        where: { UserTypeId: parent.UserTypeId }
      });
    }
  }
};
