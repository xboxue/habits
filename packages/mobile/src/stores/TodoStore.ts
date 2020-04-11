import { format, parseISO } from "date-fns";
import { action, computed, observable, reaction } from "mobx";
import { Todo as TodoEntity } from "../entities/Todo";
import { Todo } from "../models/Todo";
import { RootStore } from "./RootStore";

export class TodoStore {
  readonly todos = observable<Todo>([]);
  @observable isLoading = false;
  @observable date = format(new Date(), "yyyy-MM-dd");
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.date,
      date => this.loadTodos()
    );
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

  @action setDate(date: string) {
    this.date = date;
  }

  @computed get parsedDate() {
    return parseISO(this.date);
  }
}
