export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        userByEmail(email: String!): User
    }

    type Mutation {
        createUser(email: String!, password: String!): User!
        updateUser(id: ID!, email: String): User
        deleteUser(id: ID!): Boolean!
    }
`;