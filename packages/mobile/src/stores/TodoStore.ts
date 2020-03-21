import { action, autorun, observable, toJS } from "mobx";
import { AsyncStorage } from "react-native";
import { Todo } from "../models/Todo";
import { RootStore } from "./RootStore";

export class TodoStore {
  @observable todos: Todo[] = [];
  @observable isAdding = false;
  @observable isSelecting = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadTodos();

    autorun(async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(toJS(this.todos)));
      } catch (error) {
        console.log(error);
      }
    });
  }

  async loadTodos() {
    try {
      const todos: Todo[] = JSON.parse(await AsyncStorage.getItem("todos"));
      if (todos)
        todos.forEach(todo => this.addTodo(todo.title, todo.completed));
    } catch (error) {
      console.log(error);
    }
  }

  @action
  addTodo(title: string, completed = false) {
    this.todos.push(new Todo(title, completed));
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
