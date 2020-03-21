import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { createConnection, useContainer } from "typeorm";

const main = async () => {
  useContainer(Container);
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.ts"],
    container: Container
  });

  const server = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

main();
