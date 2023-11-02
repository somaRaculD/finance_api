import { DataSource } from 'typeorm';
import { SaldUsuario } from "../src/entity/Sald";

export const saldProvider = [
    {
        provide: 'SALD_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SaldUsuario),
        inject: ['DATA_SOURCE']
    }
]