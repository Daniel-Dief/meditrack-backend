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

    extend type Query {
        allDoctors: [Doctor!]!
        doctor (id: ID!): Doctor
    }
`