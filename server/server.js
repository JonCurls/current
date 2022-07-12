const express = require("express");
const path = require("path");

//ApolloServer
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");

//PORT connection
const PORT = process.env.PORT || 3001;

//create new ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//express conenction
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/src")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/index.html"));
});

//create new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  //intergrate Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on PORT ${PORT}!`);

      //graphQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

//call async function to start server
startApolloServer(typeDefs, resolvers);
