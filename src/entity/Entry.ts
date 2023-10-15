import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('income')
export default class Cost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    value: number;

    @Column('uuid')
    iduser: string;

    @Column()
    descripition: string;

    @Column('int4')
    idtypeincome: number;
}