import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Todo } from "../entities/Todo";
import { AddTodoInput } from "./types/AddTodoInput";

@Resolver(of => Todo)
export class TodoResolver {
  @Query(returns => [Todo])
  todos(): Promise<Todo[]> {
    return Todo.find();
  }

  @Mutation(returns => Todo)
  addTodo(@Arg("input") input: AddTodoInput) {
    const todo = Todo.create({ ...input, completed: false });
    return todo.save();
  }
}
