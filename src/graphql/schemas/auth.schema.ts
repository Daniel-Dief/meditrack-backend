import { gql } from 'apollo-server';

export const AuthSchema = gql`
    type UserProps {
        UserId: Int!
        Login: String!
        Status: String!
        UserType: String!
    }

    type responseProps {
        user: UserProps!
        token: String!
    }

    extend type Mutation {
        loginUser(hash: String!) : responseProps!
    }
`