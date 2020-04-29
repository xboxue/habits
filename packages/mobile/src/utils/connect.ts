import { createConnection } from "typeorm/browser";
import { Todo } from "../entities/Todo";

export const connect = () =>
  createConnection({
    type: "expo",
    driver: require("expo-sqlite"),
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Todo]
  });
