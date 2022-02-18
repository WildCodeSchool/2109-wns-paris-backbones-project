import {Field, ObjectType} from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    BaseEntity, ManyToOne,
} from "typeorm";
import {Project} from "./Project";
import {Role} from "./Role";
import {Task} from "./Task";
import {Notification} from "./Notification";

@Entity()
@ObjectType()
export class BackBonesUser extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column({unique: true})
    email: string;

    @Field({nullable: true})
    @Column({nullable: true})
    avatar: string;

    @Field({nullable: true})
    @Column()
    password: string;

    @Field(() => [Role], {nullable: true})
    @ManyToMany(() => Role, (role) => role.users, {
        lazy: true,
        nullable: true,
    })
    @JoinTable()
    roles: Role[];

    @Field(() => [Task], {nullable: true})
    @ManyToMany(() => Task, (task) => task.users, {
        lazy: true,
        nullable: true,
    })
    @JoinTable()
    tasks: Task[];

    @Field(() => [Project], {nullable: true})
    @ManyToMany(() => Project, (project) => project.users, {
        lazy: true,
        nullable: true,
    })
    @JoinTable()
    projects: Project[];

    @Field(() => [Notification], {nullable: true})
    @ManyToOne(() => Notification, (notification) => notification.user, {
        lazy: true,
        nullable: true,
    })
    notifications: Notification[];
}
