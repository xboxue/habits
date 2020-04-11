import { action, observable } from "mobx";
import { Todo } from "../models/Todo";
import { RootStore } from "./RootStore";

export class ViewStore {
  @observable showAddModal = false;
  @observable showEditModal = false;
  @observable showRepeatModal = false;
  @observable focusedTodo: Todo = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action setAddModal(show: boolean) {
    this.showAddModal = show;
  }

  @action setEditModal(show: boolean) {
    this.showEditModal = show;
  }

  @action setRepeatModal(show: boolean) {
    this.showRepeatModal = show;
  }

  @action setFocusedTodo(todo: Todo) {
    this.focusedTodo = todo;
  }
}
