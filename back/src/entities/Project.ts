import { Field, ID, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    OneToMany,
    JoinTable,
    BaseEntity,
} from "typeorm";

import { Status } from "./Status";
import { Task } from "./Task";
import { BackBonesUser } from "./User";

@Entity()
@ObjectType()

export class Project extends BaseEntity {
    // Simple Fields
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    photo: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    start_date: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    end_date: Date;

    // Relations
    @Field(() => Status, { nullable: true })
    @ManyToOne(() => Status, (status) => status.projects, {
        lazy: true,
        nullable: true,
    })
    status: Status;

    @Field(() => [BackBonesUser], { nullable: true })
    @ManyToMany((type) => BackBonesUser, (user) => user.projects, {
        lazy: true,
        nullable: true,
    })
    users: BackBonesUser[];


    @Field(() => [Task], { nullable: true })
    @OneToMany(() => Task, (task) => task.project, {
        lazy: true,
        nullable: true,
    })
    tasks: Task[];

}
