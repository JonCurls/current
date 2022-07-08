//mongoose model imports
const { User, Card } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //get single user by id
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .select('-__V -password')
      .populate('cards')
    },

    //get all users
    users: async () => {
      return User.find()
      .select('-__V -password')
      .populate('cards')
    },

    //logged in user data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({})
        .select('-__V -password')
        .populate('cards')
  
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token }
    },

    addCard: async (parent, args, context) => {
      if (context.user) {
        const card = await Card.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { cards: card._id }},
          { new: true }
        );
        return card;
      }
      throw new AuthenticationError('You need to be logged in');
    },

    deleteCard: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id},
          { $pull: { cards: { _id: args._id } } },
          { new: true }
        );
      }
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
