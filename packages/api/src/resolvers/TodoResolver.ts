import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Todo } from "../entities/Todo";
import { TodoInput } from "./types/TodoInput";

@Resolver(of => Todo)
export class TodoResolver {
  @Query(returns => [Todo])
  allTodos(): Promise<Todo[]> {
    return Todo.find();
  }

  @Mutation(returns => Todo)
  createTodo(@Arg("todo") todoInput: TodoInput) {
    const todo = Todo.create({ ...todoInput, completed: false });
    return todo.save();
  }
}
