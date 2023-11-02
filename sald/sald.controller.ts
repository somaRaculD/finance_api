import { Body, Controller, Get, Post, Req} from '@nestjs/common'
import SaldServices from './sald.services';
import { Request } from 'express';

@Controller('sald')
export default class SaldController {
    constructor(private readonly saldServices: SaldServices){}

    @Get()
    findAll(@Req() request: Request) {
        return this.saldServices.findAll(request);
    }
}
