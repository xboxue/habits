import { Field, ObjectType } from "type-graphql";
import { Entity, ManyToOne } from "typeorm";
import { Post } from "./Post";
import { Todo } from "./Todo";

@ObjectType()
@Entity()
export class PostTodo extends Todo {
  @Field(type => Post)
  @ManyToOne(type => Post, post => post.todos)
  post: Post;
}
