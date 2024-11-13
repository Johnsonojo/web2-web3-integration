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
    cache: "bounded",
  });

  await server.start();
  server.applyMiddleware({ app });
  const port = process.env.PORT || 4000;
  const host = process.env.NODE_ENV === 'production' ? process.env.HOST_URL : 'localhost';
  const protocol = host === 'localhost' ? 'http' : 'https';
  app.listen({ port }, () =>
    console.log(`Server ready at ${protocol}://${host}:${port}${server.graphqlPath}`)
  );
};

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
