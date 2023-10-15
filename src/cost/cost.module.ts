import { Module } from "@nestjs/common/decorators"; 
import CostController from "./cost.controller";
import CostServices from "./cost.services";
import { costProvider } from "./cost.provider";
import { DataBaseModule } from "src/database.module";
import { MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import isAuthenticated from "src/middlewares/isAuthenticated";

@Module({
    imports: [DataBaseModule],
    controllers: [CostController],
    providers: [...costProvider, CostServices]
})
export class costModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .forRoutes(CostController)
    }
}