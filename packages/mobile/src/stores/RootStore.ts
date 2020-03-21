import { createContext } from "react";
import { TodoStore } from "./TodoStore";

export class RootStore {
  todoStore = new TodoStore(this);
}

export const RootStoreContext = createContext(new RootStore());
