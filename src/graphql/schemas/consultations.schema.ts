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

    input CreateConsultationInput {
        AppointmentId: ID!
        Description: String
        Diagnosis: String
        Prescription: String
    }

    input UpdateConsultationInput {
        AppointmentId: ID
        Description: String
        Diagnosis: String
        Prescription: String
    }

    extend type Query {
        allConsultations: [Consultation!]!
        consultation (id: ID!): Consultation
    }

    extend type Mutation {
        createConsultation (input: CreateConsultationInput!): Consultation!
        updateConsultation (id: ID!, input: UpdateConsultationInput!): Consultation!
        deleteConsultation (id: ID!): Boolean!
    }
`