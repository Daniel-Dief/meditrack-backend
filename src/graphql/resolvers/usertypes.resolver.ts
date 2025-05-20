import { PrismaClient } from '@prisma/client';

interface CreateUserTypeInput {
  Name: string;
}

interface UpdateUserTypeInput {
  Name?: string;
}

export const UserTypesResolvers = {
  Query: {
    allUserTypes: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.usertypes.findMany();
    },

    userType: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.usertypes.findFirst({
        where: { UserTypeId: parseInt(args.id, 10) }
      });
    },
  },

  Mutation: {
    createUserType: async (_: any, args: { input: CreateUserTypeInput }, context: { prisma: PrismaClient }) => {
      const { Name } = args.input;
      
      return context.prisma.usertypes.create({
        data: {
          Name
        }
      });
    },

    updateUserType: async (_: any, args: { id: string; input: UpdateUserTypeInput }, context: { prisma: PrismaClient }) => {
      const { Name } = args.input;
      
      return context.prisma.usertypes.update({
        where: { UserTypeId: parseInt(args.id, 10) },
        data: {
          Name
        }
      });
    },

    deleteUserType: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      await context.prisma.usertypes.delete({
        where: { UserTypeId: parseInt(args.id, 10) }
      });
      return true;
    }
  },

  UserType: {
    Users: async (parent: { UserTypeId: number }, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.users.findMany({
        where: { UserTypeId: parent.UserTypeId }
      });
    }
  }
};