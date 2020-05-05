import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Todo } from "../entities/Todo";
import { Context } from "../types/Context";
import { CreateTodoInput } from "./types/CreateTodoInput";

@Resolver()
export class TodoResolver {
  @InjectRepository(Todo) private todoRepository: Repository<Todo>;

  @Query(returns => [Todo])
  todos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  @Mutation(returns => Todo)
  createTodo(
    @Arg("input") input: CreateTodoInput,
    @Ctx() ctx: Context
  ): Promise<Todo> {
    const todo = this.todoRepository.create({ ...input, author: ctx.user });
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
