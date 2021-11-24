import { Status } from "../entities/Status";
import { Task } from "../entities/Task";
import { BackBonesUser } from "../entities/User";
import { InputType, Field } from "type-graphql";
import { StatusInput } from "./StatusInput";
import { TaskInput } from "./TaskInput";
import { UserInput } from "./UserInput";

@InputType()
export class ProjectInput {
    @Field()
    id: number;
}

@InputType()
export class CreateProjectInput {
    //Simple

    @Field()
    title: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    photo: string;

    @Field({ nullable: true })
    start_date: Date;

    @Field({ nullable: true })
    end_date: Date;

    // Relations
    @Field((input) => StatusInput, { nullable: true })
    status: Status;

    @Field((input) => [TaskInput], { nullable: true })
    tasks: [Task];

    @Field((input) => [UserInput], { nullable: true })
    users: [BackBonesUser];

}