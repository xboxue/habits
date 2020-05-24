import { Field, ID, InputType } from "type-graphql";
import { User } from "../../entities/User";

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field(type => ID)
  uid: string;

  @Field()
  displayName: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  emailVerified: boolean;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  photoUrl?: string;
}
