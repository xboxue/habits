import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Post } from "../entities/Post";
import { PostTodo } from "../entities/PostTodo";
import { Context } from "../types/Context";
import { CreatePostInput } from "./types/CreatePostInput";

@Resolver()
export class PostResolver {
  @InjectRepository(Post) private postRepository: Repository<Post>;
  @InjectRepository(PostTodo) private todoRepository: Repository<PostTodo>;

  @Query(returns => [Post])
  feed(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ["author", "todos"]
    });
  }

  @Mutation(returns => Post)
  async createPost(
    @Arg("input") input: CreatePostInput,
    @Ctx() ctx: Context
  ): Promise<Post> {
    const todos = input.todos.map(todo =>
      this.todoRepository.create({ ...todo, author: ctx.user })
    );

    const post = this.postRepository.create({
      todos,
      content: input.content,
      author: ctx.user
    });

    return this.postRepository.save(post);
  }
}
