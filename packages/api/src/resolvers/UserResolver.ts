import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entities/User";
import { Context } from "../types/Context";
import { CreateUserInput } from "./types/CreateUserInput";

@Resolver()
export class UserResolver {
  @InjectRepository(User) private userRepository: Repository<User>;

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
}
