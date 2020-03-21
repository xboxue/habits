import { action, observable } from "mobx";
import { Todo } from "../models/Todo";
import { RootStore } from "./RootStore";

export class TodoStore {
  @observable todos: Todo[] = [];
  @observable isAdding = false;
  @observable isSelecting = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    for (let i = 0; i < 5; i++) this.todos.push(new Todo("abc"));
  }

  @action
  addTodo(title: string) {
    this.todos.push(new Todo(title));
  }

  @action
  deleteTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  @action
  deleteSelected() {
    this.todos = this.todos.filter(todo => !todo.selected);
  }
}
