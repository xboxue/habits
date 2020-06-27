import { ApolloServer, AuthenticationError } from "apollo-server-express";
import express from "express";
import * as admin from "firebase-admin";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import {
  createConnection,
  getConnectionOptions,
  getRepository,
  useContainer
} from "typeorm";
import { User } from "./entities/User";

const main = async () => {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://tortoise-88352.firebaseio.com"
  });

  useContainer(Container);

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });

  try {
    const schema = await buildSchema({
      resolvers: [__dirname + "/resolvers/**/*.{js,ts}"],
      container: Container
    });

    const server = new ApolloServer({
      schema,
      context: async ({ req }) => {
        try {
          const token = req.headers.authorization.split(" ")[1];
          const { uid } = await admin.auth().verifyIdToken(token);

          const userRepository = getRepository(User);
          const user = await userRepository.findOne(uid);

          return { user };
        } catch (error) {
          throw new AuthenticationError("Invalid user");
        }
      }
    });

    const app = express();
    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;
    app.listen({ port }, () =>
      console.log(`Server ready at http://localhost:${port}/graphql`)
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

main();
