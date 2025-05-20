import { gql } from 'apollo-server';

export const UserTypesSchema = gql`
    type UserType {
        UserTypeId: ID!
        Name: String!

        Users: [User!]!
    }

    input CreateUserTypeInput {
        Name: String!
    }

    input UpdateUserTypeInput {
        Name: String
    }

    extend type Query {
        allUserTypes: [UserType!]!
        userType (id: ID!): UserType!
    }

    extend type Mutation {
        createUserType (input: CreateUserTypeInput!): UserType!
        updateUserType (id: ID!, input: UpdateUserTypeInput!): UserType!
        deleteUserType (id: ID!): Boolean!
    }
`