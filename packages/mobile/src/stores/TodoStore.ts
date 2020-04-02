import { format, parseISO } from "date-fns";
import { action, autorun, computed, observable, reaction } from "mobx";
import { AsyncStorage } from "react-native";
import { Todo } from "../models/Todo";
import { RootStore } from "./RootStore";

export class TodoStore {
  readonly todos = observable<Todo>([]);
  @observable isAdding = false;
  @observable isSelecting = false;
  @observable isEditing = false;
  @observable isLoading = false;
  @observable isEditingRepeat = false;
  @observable focusedTodo: Todo = null;
  @observable date = format(new Date(), "yyyy-MM-dd");
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    autorun(() => {
      if (!this.selectedCount) this.isSelecting = false;
    });
  }

  storeTodos = reaction(
    () => this.todos.map(todo => [todo.title, todo.completed]),
    async () => {
      try {
        if (this.isLoading) return;
        await AsyncStorage.setItem(
          this.date,
          JSON.stringify(this.todos.slice())
        );
      } catch (error) {
        console.log(error);
      }
    }
  );

  loadTodos = reaction(
    () => this.date,
    async () => {
      try {
        this.isLoading = true;
        const todos: Todo[] = JSON.parse(await AsyncStorage.getItem(this.date));
        this.todos.replace(
          todos ? todos.map(todo => new Todo(todo.title, todo.completed)) : []
        );
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    { fireImmediately: true }
  );

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

  @computed get parsedDate() {
    return parseISO(this.date);
  }
}
