import { gql } from 'apollo-server';

export const UsersSchema = gql`
    scalar DateTime

    type User {
        UserId: ID!
        PasswordHash: String!
        UserTypeId: ID!
        StatusId: ID!
        CreatedAt: DateTime
        UpdatedAt: DateTime

        UserType: UserType!
        Status: Status!
        Patient: Patient
        Doctor: Doctor
    }

    extend type Query {
        allUsers: [User!]!
        user (id: ID!): User
    }
`