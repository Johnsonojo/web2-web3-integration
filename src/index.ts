import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST =
  process.env.NODE_ENV === "production" ? process.env.HOST_URL : "localhost";
const PROTOCOL = HOST === "localhost" ? "http" : "https";

async function startServer() {
  try {
    const app = express();

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      cache: "bounded",
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => {
      if (process.env.NODE_ENV === "production") {
        console.log(
          `🚀 Server ready at ${PROTOCOL}://${HOST}${apolloServer.graphqlPath}`
        );
      } else {
        console.log(
          `🚀 Server ready at ${PROTOCOL}://${HOST}:${PORT}${apolloServer.graphqlPath}`
        );
      }
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
