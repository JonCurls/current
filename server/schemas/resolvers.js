//mongoose model imports
const { User, Card } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello World!";
    },

    //get single user by id
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .select('-__V -password')
      .populate('cards')
    },

    users: async () => {
      return User.find()
      .select('-__V -password')
      .populate('cards')
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { user, token };
    }
  } 
};

module.exports = resolvers;
