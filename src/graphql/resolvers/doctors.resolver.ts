import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DoctorsResolvers = {
  Query: {
    allDoctors: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.doctors.findMany();
    },

    doctor: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.doctors.findFirst({
        where: { DoctorId: Number(args.id) }
      });
    },
  },

  Doctor: {
    User: async (parent: { UserId: number }, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.users.findFirst({
        where: { UserId: parent.UserId }
      });
    },

    Appointments: async (parent: { DoctorId: number }, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.appointments.findMany({
        where: { DoctorId: parent.DoctorId }
      });
    }
  }
};
