import { Field, InputType } from "type-graphql";
import { Todo } from "../../entities/Todo";

@InputType()
export class AddTodoInput implements Partial<Todo> {
  @Field()
  title: string;
}
