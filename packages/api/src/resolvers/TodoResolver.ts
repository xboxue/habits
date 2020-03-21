import "reflect-metadata";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Todo } from "../entities/Todo";
import { AddTodoInput } from "./types/AddTodoInput";

@Resolver()
export class TodoResolver {
  @InjectRepository(Todo) private todoRepository: Repository<Todo>;

  @Query(returns => [Todo])
  todos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  @Mutation(returns => Todo)
  addTodo(@Arg("input") input: AddTodoInput): Promise<Todo> {
    const todo = this.todoRepository.create({ ...input, completed: false });
    return this.todoRepository.save(todo);
  }

  @Mutation(returns => [Todo])
  async deleteTodo(
    @Arg("ids", type => [String]) ids: string[]
  ): Promise<Todo[]> {
    const todos = await this.todoRepository.findByIds(ids);
    return this.todoRepository.remove(todos);
  }
}
