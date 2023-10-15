import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { UserService } from './userServices';
import { UserDto } from './user.interface';
import { SessionDto } from './session.interface';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userServices: UserService) { }
    @Get()
    findAll(@Req() request: Request) {
        return this.userServices.findAll(request);
    }

    @Post()
    create(@Body() createUserDto: UserDto) {
        return this.userServices.create(createUserDto);
    }

    @Post('/sessions')
    createSession(@Body() createSession: SessionDto) {
        return this.userServices.createSession(createSession);
    }
} 