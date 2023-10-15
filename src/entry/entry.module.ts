import { Module } from "@nestjs/common/decorators"; 
import EntryController from "./entry.controller";
import EntryServices from "./entry.services";
import { entryProvider } from "./entry.provider";
import { DataBaseModule } from "src/database.module";
import { MiddlewareConsumer, NestModule } from "@nestjs/common";
import isAuthenticated from "src/middlewares/isAuthenticated";

@Module({
    imports: [DataBaseModule],
    controllers: [EntryController],
    providers: [...entryProvider, EntryServices]
})
export class entryModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .forRoutes(EntryController)
    }
}