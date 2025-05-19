import { gql } from 'apollo-server';

export const ConsultationsSchema = gql`
    scalar DateTime

    type Consultation {
        ConsultationId: ID!
        AppointmentId: ID!
        Description: String
        Diagnosis: String
        Prescription: String
        CreatedAt: DateTime
        UpdatedAt: DateTime

        Appointment: Appointment!
        Attachments: [Attachment!]!
    }

    extend type Query {
        allConsultations: [Consultation!]!
        consultation (id: ID!): Consultation
    }
`