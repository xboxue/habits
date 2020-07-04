import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../entities/Comment";
import { Context } from "../types/Context";
import { CreateCommentInput } from "./types/CreateCommentInput";

@Resolver()
export class CommentResolver {
  @InjectRepository(Comment) private commentRepository: Repository<Comment>;

  @Query(returns => [Comment])
  comments(@Arg("postId", type => ID) postId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: postId },
      order: { createdAt: "ASC" },
      relations: ["author"]
    });
  }

  @Mutation(returns => Comment)
  async createComment(
    @Arg("input") input: CreateCommentInput,
    @Ctx() ctx: Context
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      content: input.content,
      author: ctx.user,
      post: input.postId as any
    });

    return this.commentRepository.save(comment);
  }
}
