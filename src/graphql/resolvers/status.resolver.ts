import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const StatusResolvers = {
  Query: {
    allStatus: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.status.findMany();
    },

    status: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.status.findFirst({
        where: { StatusId: Number(args.id) }
      });
    },
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
