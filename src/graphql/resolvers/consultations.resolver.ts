import { PrismaClient } from '@prisma/client';

interface CreateConsultationInput {
  AppointmentId: string
  Description: string
  Diagnosis: string
  Prescription: string
}

interface UpdateConsultationInput {
  AppointmentId?: string
  Description?: string
  Diagnosis?: string
  Prescription?: string
}

export const ConsultationResolvers = {
  Query: {
    allConsultations: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.consultations.findMany();
    },

    consultation: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.consultations.findFirst({
        where: { ConsultationId: parseInt(args.id, 10) }
      });
    },
  },

  Mutation: {
    createConsultation: async (_: any, args: { input: CreateConsultationInput }, context: { prisma: PrismaClient }) => {
      const { AppointmentId, ...input } = args.input;

      return context.prisma.consultations.create({
        data: {
          ...input,
          AppointmentId: parseInt(AppointmentId, 10)
        }
      })
    },
    updateConsultation: async (_: any, args: { id: string, input: UpdateConsultationInput }, context: { prisma: PrismaClient }) => {
      const { AppointmentId, ...input } = args.input;

      return context.prisma.consultations.update({
        where: { ConsultationId: parseInt(args.id, 10) },
        data: {
          ...input,
          AppointmentId: AppointmentId ? parseInt(AppointmentId, 10) : undefined
        }
      });
    },
    deleteConsultation: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.consultations.delete({
        where: { ConsultationId: parseInt(args.id, 10) }
      });
    }
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
