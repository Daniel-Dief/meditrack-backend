import { PrismaClient } from '@prisma/client';

interface CreatePatientInput {
  Name: string
  Document: string
  BirthDate: Date
  Gender: boolean
  Phone: string
  UserId: string
}

interface UpdatePatientInput {
  Name?: string
  Document?: string
  BirthDate?: Date
  Gender?: boolean
  Phone?: string
  UserId?: string
}

export const PatientsResolvers = {
  Query: {
    allPatients: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.patients.findMany();
    },

    patient: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.patients.findFirst({
        where: { PatientId: parseInt(args.id, 10) }
      });
    },
  },

  Mutation: {
    createPatient: async (_: any, args: { input: CreatePatientInput }, context: { prisma: PrismaClient }) => {
      const { UserId, ...input } = args.input;

      return context.prisma.patients.create({
        data: {
          ...input,
          UserId: parseInt(UserId, 10)
        }
      });
    },

    updatePatient: async (_: any, args: { id: string; input: UpdatePatientInput }, context: { prisma: PrismaClient }) => {
      const { UserId, ...input } = args.input;
      
      return context.prisma.patients.update({
        where: { PatientId: parseInt(args.id, 10) },
        data: {
          ...input,
          UserId: UserId ? parseInt(UserId, 10) : undefined
        }
      });
    },

    deletePatient: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      await context.prisma.patients.delete({
        where: { PatientId: parseInt(args.id, 10) }
      });
      return true;
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