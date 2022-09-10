const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id })
                .select("-__v -password")
                // .populate(books)
            return userData;
            }
        throw new AuthenticationError("Not logged in");
        },
    },
    Mutation: {
        // add User. Mongoose User Model creates new user with
        // whatever is passed in as 'args'
        createUser: async (parent, args) => {
            const user = await User.create(args);
            console.log(user);

            // const token = signToken(user);
      
            // return { token, user };
            return user;
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
        // deleteBook
        // getSingleUser?
    }
};

module.exports = resolvers;