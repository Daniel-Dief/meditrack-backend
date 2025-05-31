import { PrismaClient } from '@prisma/client';

interface CreateDoctorInput {
  Name: string
  Specialty: string
  BirthDate: Date
  Email: string
  Phone: string
  CRM: string
  UserId: string
}

interface UpdateDoctorInput {
  Name?: string
  Specialty?: string
  BirthDate?: Date
  Email?: string
  Phone?: string
  CRM?: string
  UserId?: string
}

export const DoctorsResolvers = {
  Query: {
    allDoctors: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.doctors.findMany();
    },

    doctor: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.doctors.findFirst({
        where: { DoctorId: parseInt(args.id, 10) }
      });
    },
  },

  Mutation: {
    createDoctor: async(_: any, args: { input: CreateDoctorInput }, context: { prisma: PrismaClient }) => {
      const { UserId, ...input } = args.input;

      return context.prisma.doctors.create({
        data: {
          ...input,
          UserId: parseInt(UserId, 10)
        }
      })
    },
    updateDoctor: async(_: any, args: { id: string, input: UpdateDoctorInput }, context: { prisma: PrismaClient }) => {
      const { UserId, ...input } = args.input;

      return context.prisma.doctors.update({
        where: { DoctorId: parseInt(args.id, 10) },
        data: {
          ...input,
          UserId: UserId ? parseInt(UserId, 10) : undefined
        }
      });
    },
    deleteDoctor: async(_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      await context.prisma.doctors.delete({
        where: { DoctorId: parseInt(args.id, 10) }
      })
      return true;
    }
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
