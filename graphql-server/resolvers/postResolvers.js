import Post from '../models/Post.js';

export const postResolvers = {
    // Defining the query
    Query: {
        posts: async () => {
            return await Post.find({});
        }
    }
};

// The resolvers are functions that define the actual behavior of the operations defined in the schema.
// They are responsible for fetching, manipulating, or returning data when a query or mutation is made.