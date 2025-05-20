import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AppointmentResolvers = {
  Query: {
    allAppointments: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.appointments.findMany()
    },

    appointment: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.appointments.findFirst({
        where: { AppointmentId: Number(args.id) }
      });
    },
  },

  Appointment: {
    Patient: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.patients.findFirst({
        where: { PatientId: parent.PatientId },
      });
    },

    Doctor: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.doctors.findFirst({
        where: { DoctorId: parent.DoctorId },
      });
    },

    Status: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.status.findFirst({
        where: { StatusId: parent.StatusId },
      });
    },

    Consultation: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.consultations.findFirst({
        where: { ConsultationId: parent.ConsultationId },
      });
    }
  }
};