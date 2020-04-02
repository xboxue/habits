import { computed, observable } from "mobx";
import { days } from "../utils/days";

export class Todo {
  @observable title = "";
  @observable completed = false;
  @observable selected = false;
  id = Math.random();
  @observable repeatDays = {};

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

  @computed get isRepeating() {
    return Object.values(this.repeatDays).some(x => x);
  }

  @computed get repeatDaysText() {
    return Object.entries(this.repeatDays)
      .filter(([_, selected]) => selected)
      .map(([day, _]) => days[day]);
  }
}
