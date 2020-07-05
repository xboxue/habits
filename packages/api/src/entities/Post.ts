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
import { Comment } from "./Comment";
import { PostLike } from "./PostLike";
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
  @OneToMany(type => PostTodo, todo => todo.post, { cascade: true })
  todos: PostTodo[];

  @Field(type => [Comment])
  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @Field(type => [PostLike])
  @OneToMany(type => PostLike, like => like.post)
  likes: PostLike[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
