import { computed, observable } from "mobx";
import { Todo as TodoEntity } from "../entities/Todo";
import { days } from "../utils/days";

export class Todo {
  @observable title = "";
  @observable completed = false;
  @observable selected = false;
  @observable repeatDays = {};
  id: number;

  constructor(id: number, title: string, completed: boolean) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  async toggleCompleted() {
    this.completed = !this.completed;

    const todo = await TodoEntity.findOne(this.id);
    todo.completed = this.completed;
    todo.save();
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
