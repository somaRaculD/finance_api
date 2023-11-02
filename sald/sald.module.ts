import { Module } from "@nestjs/common/decorators"; 
import SaldController from "./sald.controller";
import SaldServices from "./sald.services";
import { saldProvider } from "./sald.provider";
import { DataBaseModule } from "src/database.module";
import { MiddlewareConsumer, NestModule } from "@nestjs/common";
import isAuthenticated from "src/middlewares/isAuthenticated";

@Module({
    imports: [DataBaseModule],
    controllers: [SaldController],
    providers: [...saldProvider, SaldServices]
})
export class saldModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .forRoutes(SaldController)
    }
}