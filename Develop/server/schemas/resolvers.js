const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models')

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
        // add User
        addUser: async (parent, args) => {
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
    }
}