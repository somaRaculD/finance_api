import {IsString } from 'class-validator';

export class SessionDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}