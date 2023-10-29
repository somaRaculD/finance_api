import { DataSource } from "typeorm"


const AppDataSource = [{
    provide: 'DATA_SOURCE',
    useFactory: async () =>{
    const dataSource = new DataSource({
        type: "postgres",
        host: "db-postgresql-nyc3-79668-do-user-14820194-0.b.db.ondigitalocean.com",
        port: 2506,
        username: "postgres_user_m",
        password: "AVNS_NxV0LO3QjYqqE54ai6A",
        database: "finance",
        url: 'postgresql://postgres_user_m:AVNS_NxV0LO3QjYqqE54ai6A@db-postgresql-nyc3-79668-do-user-14820194-0.b.db.ondigitalocean.com:25061/primeira_conexao?sslmode=require',
        entities: [
            __dirname + "/entity/*{.ts,.js}"
        ],
        synchronize: false
    });
    return dataSource.initialize();
}
}];


export default AppDataSource;