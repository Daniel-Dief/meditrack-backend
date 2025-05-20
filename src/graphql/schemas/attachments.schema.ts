import { gql } from 'apollo-server';

export const AttachmentsSchema = gql`
    scalar DateTime

    type Attachment  {
        AttachmentId: ID!
        ConsultationId: ID!
        FilePath: String
        FileType: String
        CreatedAt: DateTime
        UploadedAt: DateTime

        Consultation: Consultation!
    }

    input CreateAttachmentInput {
        ConsultationId: ID!
        FilePath: String
        FileType: String
    }

    input UpdateAttachmentInput {
        ConsultationId: ID
        FilePath: String
        FileType: String
    }

    extend type Query {
        allAttachments: [Attachment!]!
        attachment (id: ID!): Attachment
    }

    extend type Mutation {
        createAttachment (input: CreateAttachmentInput!): Attachment!
        updateAttachment (id: ID!, input: UpdateAttachmentInput!): Attachment!
        deleteAttachment (id: ID!): Boolean!
    }
`