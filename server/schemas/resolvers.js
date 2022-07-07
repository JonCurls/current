//mongoose model imports
const { User, Card } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello World!";
    },
  },
};

module.exports = resolvers;
