import * as bcrypt from "bcrypt";
import {
  Arg,
  Field,
  InterfaceType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import {BackBonesUser} from "../entities/User";
import {errorHandler} from "../utils/errorHandler";
import * as jwt from "jsonwebtoken";
import {SignInInput, SignUpInput} from "../inputs/AuthInput";
import {validate} from "class-validator";

@InterfaceType()
abstract class IAuthorizedUser {
  @Field()
  token: string;

  @Field()
  userId: number;
}

@ObjectType({implements: IAuthorizedUser})
class AuthorizedUser implements IAuthorizedUser {
  token: string;
  userId: number;
}

@Resolver()
export class AuthResolver {
  //SIGN IN
  @Mutation(() => AuthorizedUser, { nullable: true })
  async signIn(@Arg("signInInput") input: SignInInput) {
    const email = input.email;
    try {
      const user = await BackBonesUser.findOne({ email });
      if (!user) {
        return errorHandler("Invalid credentials", 1);
      }

      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) {
        return errorHandler("Invalid credentials", 1);
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as jwt.Secret
      );
      return {
        token,
        userId: user.id,
      };
    } catch (error) {
      throw error;
    }
  }


  //SIGN UP
  @Mutation(() => AuthorizedUser, {nullable: true})
  async signUp(@Arg("signUpInput") input: SignUpInput) {
    try {
      const email = input.email;
      const existingUser = await BackBonesUser.findOne({email});
      if (existingUser) {
        errorHandler("User already exists", 1);
      }

      const newUser = await BackBonesUser.create(input)
      const errors = await validate(newUser)
      if (errors.length > 0) {
        errorHandler("email not valid", 0);
      }
      await newUser.save()

      console.log(
        `User ${newUser.id} Created: [firstName: ${newUser.firstName}]`
      );
      const token = jwt.sign(
        {userId: newUser.id},
        process.env.JWT_SECRET as jwt.Secret
      );
      return {
        token,
        userId: newUser.id,
      };
    } catch (error) {
      throw error;
    }
  }
}
