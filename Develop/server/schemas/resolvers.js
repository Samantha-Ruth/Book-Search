const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id })
                .select("-__v -password")
                .populate('savedBooks')
            return userData;
            }
        throw new AuthenticationError("Not logged in");
        },

        // This is probably a bit messed up - couldn't I just 
        // call the User on this one? 
        savedBooks: async (parent, { username }) => {
            const params = username ? { username } : {};
            return User.find(params);
        },
        
        // get all users
        users: async () => {
            return User.find()
            .select("-__v -password")
            .populate("savedBooks");
        },

        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select(-__v -password)
            .populate("savedBooks");
        }

        // get single book



    },
    Mutation: {
    // add User. 
        // Mongoose User Model creates new user with
        // whatever is passed in as 'args'
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
          },


    // user login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError("Incorrect credentials");
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError("Incorrect credentials");
            }
      
            const token = signToken(user);
            return { token, user };
        },

    // saveBook
    saveBook: async (parent, {args}, context) => {
            console.log(args);
            if (context.user) {
            const savedBook = await User.findOneAndUpdate(
                {_id: context.user._id},
                { $addToSet: { savedBooks: { args: context.user.username } }},
                // {new: true, runValidators: true}
                {new: true}
            );
        return savedBook;
        }
        throw new AuthenticationError("You need to be logged in.");
      },


        // deleteBook
        // getSingleUser?
    }
};

module.exports = resolvers;