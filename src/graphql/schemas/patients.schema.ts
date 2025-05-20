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

    input CreatePatientInput {
        Name: String!
        Document: String!
        BirthDate: DateTime
        Gender: Boolean
        Phone: String
        UserId: ID!
    }

    input UpdatePatientInput {
        Name: String
        Document: String
        BirthDate: DateTime
        Gender: Boolean
        Phone: String
        UserId: ID
    }

    extend type Query {
        allPatients: [Patient!]!
        patient (id: ID!): Patient
    }

    extend type Mutation {
        createPatient(input: CreatePatientInput!): Patient!
        updatePatient(id: ID!, input: UpdatePatientInput!): Patient!
        deletePatient(id: ID!): Boolean!
    }
`