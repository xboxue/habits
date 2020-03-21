import { observable } from "mobx";

export class Todo {
  @observable title = "";
  @observable completed = false;
  @observable selected = false;
  id = Math.random();

  constructor(title: string, completed: boolean) {
    this.title = title;
    this.completed = completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  toggleSelected() {
    this.selected = !this.selected;
  }
}
