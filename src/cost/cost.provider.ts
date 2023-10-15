import { DataSource } from 'typeorm';
import Cost from 'src/entity/Cost';


export const costProvider = [
    {
        provide: 'COST_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Cost),
        inject: ['DATA_SOURCE']
    }
]