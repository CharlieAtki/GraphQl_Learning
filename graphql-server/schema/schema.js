export const typeDefs = `#graphql
    # User typeDef
    type User {
        id: ID!
        email: String
        createdAt: String
        updatedAt: String
    }

    # Post typeDef
    type Post {
        id: ID!
        title: String
        author: String
        content: String
        reviews: [Int!]!
        createdAt: String
        updatedAt: String
    }

    # Defining how the data should be fetched
    type Query {
        # User queries
        users: [User!]!
        user(id: ID!): User
        userByEmail(email: String!): User
        
        # Post queries 
        posts: [Post!]! 
    }

    # These are defining the "methods" -> actions on the data 
    type Mutation {
        # User Mutations
        createUser(email: String!, password: String!): User!
        updateUser(id: ID!, email: String): User
        deleteUser(id: ID!): Boolean!
        
        # Post mutations
        createPost(title: String!, author: String!, content: String!): Post!
    }
`;

// The schema defines the structure and types of data that your API can expose.
// It's like a blueprint or contract for how clients (frontend applications) can interact with the backend.