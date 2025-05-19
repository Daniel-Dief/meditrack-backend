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

    extend type Query {
        allAttachments: [Attachment!]!
        attachment (id: ID!): Attachment
    }
`