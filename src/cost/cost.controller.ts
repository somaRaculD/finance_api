import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import CostServices from "./cost.services";
import { Request } from "express";
import { CostDto } from "./cost.interface";

@Controller('cost')
export default class CostController {
    constructor(private readonly costServices: CostServices) {}

    @Get()
    findAll(@Req() request: Request) {
        return this.costServices.findAll(request);
    }

    @Post()
    create(@Body() create: CostDto, @Req() request: Request){
        return this.costServices.create(create, request);
    }
}