import { IsString, IsDate } from "class-validator";

export class UserDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly dataNascimento: Date;
    
    @IsString()
    readonly password: string;
    
    @IsString()
    readonly confPassword: string;
    
    @IsString()
    readonly email: string
}