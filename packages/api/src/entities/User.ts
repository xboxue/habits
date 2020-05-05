import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn
} from "typeorm";
import { Post } from "./Post";
import { Todo } from "./Todo";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryColumn()
  uid: string;

  @Field()
  @Column()
  displayName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  emailVerified: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photoUrl?: string;

  @Field(type => [Post])
  @OneToMany(type => Post, post => post.author)
  posts: Post[];

  @Field(type => [Todo])
  @OneToMany(type => Todo, todo => todo.author)
  todos: Todo[];

  @Field(type => [User])
  @ManyToMany(type => User, user => user.following)
  @JoinTable()
  followers: User[];

  @Field(type => [User])
  @ManyToMany(type => User, user => user.followers)
  following: User[];
}
