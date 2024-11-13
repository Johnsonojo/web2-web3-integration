import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import express from "express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";

dotenv.config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
