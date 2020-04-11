import { format, parseISO } from "date-fns";
import { action, autorun, computed, observable, reaction } from "mobx";
import { Todo as TodoEntity } from "../entities/Todo";
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

    reaction(() => this.date, this.loadTodos);

    autorun(() => {
      if (!this.selectedCount) this.isSelecting = false;
    });
  }

  @action
  async loadTodos() {
    this.isLoading = true;
    const todos = await TodoEntity.find();
    this.todos.replace(
      todos.map(todo => new Todo(todo.id, todo.title, todo.completed))
    );
    this.isLoading = false;
  }

  @action
  async addTodo(title: string, completed = false) {
    const todo = await TodoEntity.create({ title, completed }).save();
    this.todos.push(new Todo(todo.id, title, completed));
  }

  @action
  async deleteTodo(todoModel: Todo) {
    this.todos.splice(this.todos.indexOf(todoModel), 1);
    TodoEntity.delete(todoModel.id);
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
