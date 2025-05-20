import { PrismaClient } from '@prisma/client';

interface CreateAttachmentInput {
  ConsultationId: string
  FilePath: string
  FileType: string
}

interface UpdateAttachmentInput {
  ConsultationId?: string
  FilePath?: string
  FileType?: string
}

export const AttachmentsResolvers = {
  Query: {
    allAttachments: async (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.attachments.findMany();
    },

    attachment: async (_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.attachments.findFirst({
        where: { AttachmentId: parseInt(args.id, 10) }
      });
    },
  },

  Mutation: {
    createAttachment: async(_: any, args: { input: CreateAttachmentInput }, context: { prisma: PrismaClient }) => {
      const { ConsultationId, ...input } = args.input;

      return context.prisma.attachments.create({
        data: {
          ...input,
          ConsultationId: parseInt(ConsultationId, 10)
        }
      });
    },
    updateAttachment: async(_: any, args: { id: string, input: UpdateAttachmentInput }, context: { prisma: PrismaClient }) => {
      const { ConsultationId, ...input } = args.input;

      return context.prisma.attachments.update({
        where: { AttachmentId: parseInt(args.id, 10) },
        data: {
          ...input,
          ConsultationId: ConsultationId ? parseInt(ConsultationId, 10) : undefined
        }
      });
    },
    deleteAttachment: async(_: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.attachments.delete({
        where: { AttachmentId: parseInt(args.id, 10) }
      });
    }
  },

  Attachment: {
    Consultation: async (parent: any, _: any, context: { prisma: PrismaClient }) => {
      return context.prisma.consultations.findFirst({
        where: { ConsultationId: parseInt(parent.ConsultationId, 10) }
      });
    }
  }
};
