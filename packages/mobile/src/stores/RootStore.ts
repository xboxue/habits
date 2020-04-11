import { createContext } from "react";
import { TodoStore } from "./TodoStore";
import { ViewStore } from "./ViewStore";

export class RootStore {
  todoStore = new TodoStore(this);
  viewStore = new ViewStore(this);
}

export const RootStoreContext = createContext(new RootStore());
