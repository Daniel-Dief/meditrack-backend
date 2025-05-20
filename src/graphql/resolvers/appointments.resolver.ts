import { PrismaClient } from '@prisma/client';

interface CreateAppointmentInput {
  AppointmentDate: Date
  PatientId: string
  DoctorId: string
  StatusId: string
}

interface UpdateAppointmentInput {
  AppointmentDate: Date
  PatientId?: string
  DoctorId?: string
  StatusId?: string
}

export const AppointmentResolvers = {
  Query: {
    allAppointments: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.appointments.findMany()
    },

    appointment: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.appointments.findFirst({
        where: { AppointmentId: parseInt(args.id, 10) }
      });
    },
  },

  Mutation: {
    createAppointment: async (_: any, args: { input: CreateAppointmentInput }, context: { prisma: PrismaClient }) => {
      const { AppointmentDate, PatientId, DoctorId, StatusId } = args.input;

      return context.prisma.appointments.create({
        data: {
          AppointmentDate,
          PatientId: parseInt(PatientId, 10),
          DoctorId: parseInt(DoctorId, 10),
          StatusId: parseInt(StatusId, 10)
        }
      });
    },
    updateAppointment: async (_: any, args: { id: string, input: UpdateAppointmentInput }, context: { prisma: PrismaClient }) => {
      const { AppointmentDate, PatientId, DoctorId, StatusId } = args.input;

      return context.prisma.appointments.update({
        where: { AppointmentId: parseInt(args.id, 10) },
        data: {
          AppointmentDate,
          PatientId: PatientId ? parseInt(PatientId, 10) : undefined,
          DoctorId: DoctorId ? parseInt(DoctorId, 10) : undefined,
          StatusId: StatusId ? parseInt(StatusId, 10) : undefined
        }
      });
    },
    deleteAppointment: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.appointments.delete({
        where: { AppointmentId: parseInt(args.id, 10) }
      });
    }
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
        where: { AppointmentId: parent.AppointmentId },
      });
    }
  }
};