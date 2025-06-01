import { gql } from 'apollo-server';

export const UsersSchema = gql`
    scalar DateTime

    type User {
        UserId: ID!
        Login: String!
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

    input CreateUserInput {
        PasswordHash: String!
        UserTypeId: ID!
        StatusId: ID!
    }

    input UpdateUserInput {
        PasswordHash: String
        UserTypeId: ID
        StatusId: ID
    }

    extend type Query {
        allUsers: [User!]!
        user (id: ID!): User
    }
    
    extend type Mutation {
        createUser (input: CreateUserInput!): User!
        updateUser (id: ID!, input: UpdateUserInput!): User!
        deleteUser (id: ID!): Boolean!
    }
`