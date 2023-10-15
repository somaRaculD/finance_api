import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('cost')
export default class Cost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    price: number;

    @Column('uuid')
    iduser: string;

    @Column('date')
    data: Date;

    @Column()
    motivation: string;

    @Column('int4')
    idcard: number;

    @Column('int4')
    idtypecost: number;
}