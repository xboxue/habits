import { Field, InputType } from "type-graphql";
import { Todo } from "../../entities/Todo";

@InputType()
export class DeleteTodoInput implements Partial<Todo> {
  @Field()
  id: number;
}
