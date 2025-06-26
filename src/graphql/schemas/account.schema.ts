import { gql } from 'apollo-server';

export const AccountSchema = gql`
    scalar DateTime

    input AccountDoctorInput {
        Name: String!
        Specialty: String
        BirthDate: DateTime
        Email: String
        Phone: String
        CRM: String!
        Login: String!
        Password: String!
    }

    input AccountPatientInput {
        Name: String!
        Document: String!
        BirthDate: DateTime
        Gender: Boolean
        Phone: String
        Login: String!
        Password: String!
    }

    type AccountDoctorResponse {
        DoctorId: ID!
        Name: String!
        Specialty: String
        BirthDate: DateTime
        Email: String
        Phone: String
        CRM: String!
        Login: String!
    }

    type AccountPatientResponse {
        PatientId: ID!
        Name: String!
        Document: String!
        BirthDate: DateTime
        Gender: Boolean
        Phone: String
        Login: String!
    }

    extend type Mutation {
        createDoctorAccount(input: AccountDoctorInput!): AccountDoctorResponse!
        createPatientAccount(input: AccountPatientInput!): AccountPatientResponse!
    }
`