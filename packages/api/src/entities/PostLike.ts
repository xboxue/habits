import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class PostLike extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => User)
  @ManyToOne(type => User, user => user.likedPosts)
  user: User;

  @Field(type => Post)
  @ManyToOne(type => Post, post => post.likes)
  post: Post;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
