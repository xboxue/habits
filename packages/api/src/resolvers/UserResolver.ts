import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entities/User";
import { Context } from "../types/Context";
import { CreateUserInput } from "./types/CreateUserInput";

@Resolver(of => User)
export class UserResolver {
  @InjectRepository(User) private userRepository: Repository<User>;

  @Query(returns => User)
  user(@Arg("id") id: string): Promise<User> {
    return this.userRepository.findOne(id, {
      relations: ["posts", "posts.todos"]
    });
  }

  @Query(returns => [User])
  users(@Arg("name") name: string, @Ctx() { user }: Context): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .where("user.displayName ILIKE :name", { name: `${name}%` })
      .andWhere("user.uid <> :uid", { uid: user.uid })
      .getMany();
  }

  @Mutation(returns => User)
  createUser(@Arg("input") input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input);
    return this.userRepository.save(user);
  }

  @FieldResolver(returns => Int)
  async followerCount(@Root() { uid }: User): Promise<number> {
    const { followerCount } = await this.userRepository
      .createQueryBuilder("user")
      .innerJoin("user.followers", "follower")
      .where("user.uid = :uid", { uid })
      .select("COUNT(*)", "followerCount")
      .getRawOne();
    return followerCount;
  }

  @FieldResolver(returns => Int)
  async followingCount(@Root() { uid }: User): Promise<number> {
    const { followingCount } = await this.userRepository
      .createQueryBuilder("user")
      .innerJoin("user.following", "follower")
      .where("user.uid = :uid", { uid })
      .select("COUNT(*)", "followingCount")
      .getRawOne();
    return followingCount;
  }
}
