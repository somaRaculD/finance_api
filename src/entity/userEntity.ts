import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('date')
    dataNascimento: Date;

    @Column('varchar')
    password: string;

    @Column('varchar')
    confPassword: string;

    @Column('varchar')
    email: string;
}