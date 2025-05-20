import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PatientsResolvers = {
  Query: {
    allPatients: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.patients.findMany();
    },

    patient: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.patients.findFirst({
        where: { PatientId: Number(args.id) }
      });
    },
  },

  Patient: {
    User: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.users.findFirst({
        where: { UserId: parent.UserId }
      });
    },

    Appointments: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.appointments.findMany({
        where: { PatientId: parent.PatientId }
      });
    },
  }
};
