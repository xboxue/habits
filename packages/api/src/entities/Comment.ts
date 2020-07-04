import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field(type => User)
  @ManyToOne(type => User, user => user.comments)
  author: User;

  @Field(type => Post)
  @ManyToOne(type => Post, post => post.comments)
  post: Post;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
