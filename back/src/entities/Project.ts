import { Field, ID, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    BaseEntity,
} from "typeorm";

@Entity()
@ObjectType()

export class Project extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description: string;

    @Field()
    @Column()
    photo: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    start_date: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    end_date: Date;

}
