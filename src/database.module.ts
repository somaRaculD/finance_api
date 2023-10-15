import { Module } from '@nestjs/common';
import AppDataSource from './data-souce.providers';

@Module({
    providers: [...AppDataSource],
    exports: [...AppDataSource]
})
export class DataBaseModule {}