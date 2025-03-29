import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Step 1: Set up MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/graphql-database';

mongoose.connect(mongoUri)
.then(() => {
  console.log('MongoDB connected successfully');
  console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process with failure
});

// Step 2: Define a MongoDB model (example: Users)
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const User = model('User', userSchema);

// Step 3: Define GraphQL Schema (typeDefs)
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    age: Int
    createdAt: String
    updatedAt: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String, email: String, age: Int): User
    updateUser(id: ID!, name: String, email: String, age: Int): User
    deleteUser(id: ID!): String
  }
`;

// Step 4: Define resolvers for the schema
const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    createUser: async (_, { name, email, age }) => {
      try {
        const newUser = new User({ name, email, age });
        return await newUser.save();
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    },
    updateUser: async (_, { id, name, email, age }) => {
      try {
        return await User.findByIdAndUpdate(
          id,
          { name, email, age },
          { new: true, runValidators: true }
        );
      } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          throw new Error('User not found');
        }
        return `User with id ${id} deleted successfully.`;
      } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
    },
  },
};

// Step 5: Initialize Apollo Server with schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*', // Be more specific in production
    credentials: true
  }
});

// Step 6: Start the server
const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});