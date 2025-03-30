import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';

// Import schema and resolvers
import { typeDefs } from './schema/schema.js';
import { userResolvers } from './resolvers/userResolvers.js';

// Combine all resolvers
const resolvers = {
    Query: {
        ...userResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
    },
};

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/backend-database';

mongoose.connect(mongoUri)
    .then(() => {
        console.log('MongoDB connected successfully');
        console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
});

console.log(`🚀 Server ready at ${url}`);