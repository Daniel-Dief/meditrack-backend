import { gql } from 'apollo-server';

export const DoctorsSchema = gql`
    scalar DateTime

    type Doctor {
        DoctorId: ID!
        Name: String!
        Specialty: String
        BirthDate: DateTime
        Email: String
        Phone: String
        CRM: String!
        UserId: ID!
        CreatedAt: DateTime
        UpdatedAt: DateTime

        User: User!
        Appointments: [Appointment!]!
    }

    input CreateDoctorInput {
        Name: String!
        Specialty: String!
        BirthDate: DateTime!
        Email: String!
        Phone: String!
        CRM: String!
        UserId: ID!
    }

    input UpdateDoctorInput {
        Name: String
        Specialty: String
        BirthDate: DateTime
        Email: String
        Phone: String
        CRM: String
        UserId: ID
    }

    extend type Query {
        allDoctors: [Doctor!]!
        doctor (id: ID!): Doctor
    }

    extend type Mutation {
        createDoctor(input: CreateDoctorInput!): Doctor!
        updateDoctor(id: ID!, input: UpdateDoctorInput!): Doctor!
        deleteDoctor(id: ID!): Boolean!
    }
`