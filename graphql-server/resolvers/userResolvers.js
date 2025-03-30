import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const userResolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        user: async (_, { id }) => {
            return await User.findById(id);
        },
        userByEmail: async (_, { email }) => {
            return await User.findOne({ email });
        }
    },
    Mutation: {
        createUser: async (_, { email, password }) => {
            // Still hashing the password for security
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = new User({
                email,
                hashedPassword
            });
            
            await newUser.save();
            return newUser;
        },
        updateUser: async (_, { id, email }) => {
            return await User.findByIdAndUpdate(
                id, 
                { email }, 
                { new: true }
            );
        },
        deleteUser: async (_, { id }) => {
            const result = await User.findByIdAndDelete(id);
            return !!result;
        }
    }
};