import { Module } from "@nestjs/common/decorators"; 
import { UserController } from "./userController";
import { UserService } from "./userServices";
import { usersProviders } from "./user.providers";
import { DataBaseModule } from "src/database.module";
import { MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import isAuthenticated from "src/middlewares/isAuthenticated";

@Module({
    imports: [DataBaseModule],
    controllers: [UserController],
    providers: [...usersProviders, UserService]
})
export class userModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .exclude( 
                {path: 'user', method: RequestMethod.POST },
                {path: 'user/sessions', method: RequestMethod.POST }
            )
            .forRoutes(UserController)
    }
}