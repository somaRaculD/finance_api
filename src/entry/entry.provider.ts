import { DataSource } from 'typeorm';
import Entry from "../entity/Entry";

export const entryProvider = [
    {
        provide: 'ENTRY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Entry),
        inject: ['DATA_SOURCE']
    }
]