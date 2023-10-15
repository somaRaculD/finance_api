import { DataSource } from "typeorm"

const AppDataSource = [{
    provide: 'DATA_SOURCE',
    useFactory: async () =>{
    const dataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "jkh29uxg03",
        database: "finance",
        entities: [
            __dirname + "/entity/*{.ts,.js}"
        ],
        synchronize: false
    });
    return dataSource.initialize();
}
}];

export default AppDataSource;