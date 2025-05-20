import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AttachmentsResolvers = {
  Query: {
    allAttachments: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.attachments.findMany();
    },

    attachment: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.attachments.findFirst({
        where: { AttachmentId: Number(args.id) }
      });
    },
  },

  Attachment: {
    Consultation: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.consultations.findFirst({
        where: { ConsultationId: Number(parent.ConsultationId) }
      });
    }
  }
};
