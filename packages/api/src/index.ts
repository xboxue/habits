import { ApolloServer, AuthenticationError } from "apollo-server-express";
import express from "express";
import * as admin from "firebase-admin";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { createConnection, getRepository, useContainer } from "typeorm";
import { User } from "./entities/User";

const main = async () => {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://tortoise-88352.firebaseio.com"
  });

  useContainer(Container);
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.ts"],
    container: Container
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      try {
        const token = req.headers.authorization;
        const { uid } = await admin.auth().verifyIdToken(token);

        const userRepository = getRepository(User);
        const user = userRepository.findOne(uid);

        return { user };
      } catch (error) {
        throw new AuthenticationError("Invalid user");
      }
    }
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

main();
