import { gql } from 'apollo-server';

export const StatusSchema = gql`
    type Status {
        StatusId: ID!
        Name: String!

        Users: [User!]!
        Appointments: [Appointment!]!
    }

    extend type Query {
        allStatus: [Status!]!
        status (id: ID!): Status!
    }
`