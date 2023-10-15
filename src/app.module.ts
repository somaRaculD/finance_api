import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './user/userModule';
import { costModule } from './cost/cost.module';
import { entryModule } from './entry/entry.module';
import { saldModule } from './sald/sald.module'

@Module({
  imports: [userModule, costModule, saldModule, entryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
