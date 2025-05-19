import { gql } from 'apollo-server';

export const UserTypesSchema = gql`
    type UserType {
        UserTypeId: ID!
        Name: String!

        Users: [User!]!
    }

    extend type Query {
        allUserTypes: [UserType!]!
        userType (id: ID!): UserType!
    }
`