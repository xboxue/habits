import { action, autorun, computed, observable } from "mobx";
import { AsyncStorage } from "react-native";
import { Todo } from "../models/Todo";
import { RootStore } from "./RootStore";

export class TodoStore {
  readonly todos = observable<Todo>([]);
  @observable isAdding = false;
  @observable isSelecting = false;
  @observable isEditing = false;
  @observable focusedTodo: Todo = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadTodos();

    autorun(async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(this.todos.slice()));
      } catch (error) {
        console.log(error);
      }
    });

    autorun(() => {
      if (!this.selectedCount) this.isSelecting = false;
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
    this.todos.replace(this.todos.filter(todo => !todo.selected));
  }

  @action
  toggleAllSelected(selected: boolean) {
    this.todos.forEach(todo => (todo.selected = selected));
  }

  @computed get selectedCount() {
    return this.todos.reduce(
      (count, todo) => (todo.selected ? count + 1 : count),
      0
    );
  }
}
