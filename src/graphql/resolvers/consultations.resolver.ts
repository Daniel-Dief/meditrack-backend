import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ConsultationResolvers = {
  Query: {
    allConsultations: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.consultations.findMany();
    },

    consultation: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.consultations.findFirst({
        where: { ConsultationId: Number(args.id) }
      });
    },
  },

  Consultation: {
    Appointment: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.appointments.findFirst({
        where: { AppointmentId: parent.AppointmentId }
      });
    },

    Attachments: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.attachments.findMany({
        where: { ConsultationId: parent.ConsultationId }
      });
    }
  }
};
