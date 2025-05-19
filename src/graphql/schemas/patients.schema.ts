import { gql } from 'apollo-server';

export const PatientsSchema = gql`
    scalar DateTime

    type Patient {
        PatientId: ID!
        Name: String!
        Document: String!
        BirthDate: DateTime
        Gender: Boolean
        Phone: String
        UserId: ID!
        CreatedAt: DateTime
        UpdatedAt: DateTime

        User: User!
        Appointments: [Appointment!]!
    }

    extend type Query {
        allPatients: [Patient!]!
        patient (id: ID!): Patient
    }
`