import { Field, InputType } from "type-graphql";
import { CreateTodoInput } from "./CreateTodoInput";

@InputType()
export class CreatePostInput {
  @Field()
  content: string;

  @Field(type => [CreateTodoInput])
  todos: CreateTodoInput[];
}
