import { Body, Controller, Get, Post, Req} from '@nestjs/common'
import EntryServices from './entry.services';
import { Request } from 'express';
import { EntryDto } from './entry.interface';

@Controller('entry')
export default class EntryController {
    constructor(private readonly entryServices: EntryServices){}

    @Get()
    findAll(@Req() request: Request) {
        return this.entryServices.findAll(request);
    }

    @Post()
    create(@Body() create: EntryDto, @Req() request: Request) {
        return this.entryServices.create(create, request);
    }
}