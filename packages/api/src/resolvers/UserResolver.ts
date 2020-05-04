import { Arg, Mutation, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entities/User";
import { CreateUserInput } from "./types/CreateUserInput";

@Resolver()
export class UserResolver {
  @InjectRepository(User) private userRepository: Repository<User>;

  @Mutation(returns => User)
  createUser(@Arg("input") input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input);
    return this.userRepository.save(user);
  }
}
