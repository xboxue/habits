import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { In, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";
import { PostLike } from "../entities/PostLike";
import { PostTodo } from "../entities/PostTodo";
import { Context } from "../types/Context";
import { CreatePostInput } from "./types/CreatePostInput";

@Resolver(of => Post)
export class PostResolver {
  @InjectRepository(Post) private postRepository: Repository<Post>;
  @InjectRepository(PostTodo) private todoRepository: Repository<PostTodo>;
  @InjectRepository(Comment) private commentRepository: Repository<Comment>;
  @InjectRepository(PostLike) private likeRepository: Repository<PostLike>;

  @Query(returns => [Post])
  feed(@Ctx() { user }: Context): Promise<Post[]> {
    return this.postRepository.find({
      where: { author: In([...user.followingIds, user.id]) },
      order: { createdAt: "DESC" },
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

  @Mutation(returns => Post)
  async likePost(
    @Arg("id", type => ID) id: string,
    @Ctx() { user }: Context
  ): Promise<Post> {
    const post = await this.postRepository.findOne(id, {
      relations: ["likes"]
    });

    const like = this.likeRepository.create({ user, post });
    await like.save();

    post.likes.push(like);
    return post.save();
  }

  @Mutation(returns => Post)
  async unlikePost(
    @Arg("id", type => ID) id: string,
    @Ctx() { user }: Context
  ): Promise<Post> {
    const post = await this.postRepository.findOne(id, {
      relations: ["likes", "likes.user"]
    });

    post.likes = post.likes.filter(like => like.user.id !== user.id);
    return post.save();
  }

  @FieldResolver(returns => Int)
  async likeCount(@Root() post: Post): Promise<number> {
    return this.likeRepository.count({
      where: { post: post.id }
    });
  }

  @FieldResolver(returns => Int)
  async commentCount(@Root() post: Post): Promise<number> {
    return this.commentRepository.count({
      where: { post: post.id }
    });
  }

  @FieldResolver(returns => Boolean)
  async isLiked(
    @Root() post: Post,
    @Ctx() { user }: Context
  ): Promise<boolean> {
    const isLiked = await this.likeRepository.count({
      where: { post: post.id, user: user.id }
    });
    return !!isLiked;
  }
}
