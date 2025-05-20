import { PrismaClient } from '@prisma/client';

interface CreateStatusInput {
  Name: string
}

interface UpdateStatusInput {
  Name?: string
}

export const StatusResolvers = {
  Query: {
    allStatus: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.status.findMany();
    },

    status: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.status.findFirst({
        where: { StatusId: parseInt(args.id, 10) }
      });
    },
  },

  Mutation: {
    createStatus: async (_: any, args: { input: CreateStatusInput }, context: { prisma: PrismaClient }) => {
      const { Name } = args.input;
      
      return context.prisma.status.create({
        data: {
          Name
        }
      });
    },

    updateStatus: async (_: any, args: { id: string, input: UpdateStatusInput }, context: { prisma: PrismaClient }) => {
      const { Name } = args.input;
      
      return context.prisma.status.update({
        where: { StatusId: parseInt(args.id, 10) },
        data: {
          Name
        }
      });
    },

    deleteStatus: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      await context.prisma.status.delete({
        where: { StatusId: parseInt(args.id, 10) }
      });
      return true;
    }
  },

  Status: {
    Users: async (parent: { StatusId: number }, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.users.findMany({
        where: { StatusId: parent.StatusId }
      });
    },

    Appointments: async (parent: { StatusId: number }, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.appointments.findMany({
        where: { StatusId: parent.StatusId }
      });
    }
  }
};