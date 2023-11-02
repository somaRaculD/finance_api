import { DataSource } from "typeorm"


const AppDataSource = [{
    provide: 'DATA_SOURCE',
    useFactory: async () => {
        const dataSource = new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            "ssl": true,
            "extra": {
                "ssl": {
                    "rejectUnauthorized": false
                }
            },
            url: process.env.DB_URL,
            entities: [
                __dirname + "/entity/*{.ts,.js}"
            ],
            synchronize: false
        });
        return dataSource.initialize();
    }
}];

export default AppDataSource;

