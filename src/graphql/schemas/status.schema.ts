import { gql } from 'apollo-server';

export const StatusSchema = gql`
    type Status {
        StatusId: ID!
        Name: String!

        Users: [User!]!
        Appointments: [Appointment!]!
    }

    input CreateStatusInput {
        Name: String!
    }

    input UpdateStatusInput {
        Name: String
    }

    extend type Query {
        allStatus: [Status!]!
        status (id: ID!): Status!
    }

    extend type Mutation {
        createStatus (input: CreateStatusInput!): Status!
        updateStatus (id: ID!, input: UpdateStatusInput!): Status!
        deleteStatus (id: ID!): Boolean!
    }
`