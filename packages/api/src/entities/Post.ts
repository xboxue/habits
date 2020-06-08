import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { PostTodo } from "./PostTodo";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field(type => User)
  @ManyToOne(type => User, user => user.posts)
  author: User;

  @Field(type => [PostTodo])
  @OneToMany(type => PostTodo, todo => todo.post)
  todos: PostTodo[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
