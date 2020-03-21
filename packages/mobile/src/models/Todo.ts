import { observable } from "mobx";

export class Todo {
  @observable title = "";
  @observable completed = false;
  @observable selected = false;
  id = Math.random();

  constructor(title: string) {
    this.title = title;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  toggleSelected() {
    this.selected = !this.selected;
  }
}
