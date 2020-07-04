import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCommentInput {
  @Field()
  postId: string;

  @Field()
  content: string;
}
