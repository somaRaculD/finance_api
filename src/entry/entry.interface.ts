import { IsNumber, IsInt, IsString, IsOptional, } from 'class-validator';

export class EntryDto {
    @IsString()
    readonly descripition: string;

    @IsNumber()
    readonly value: number;

    @IsInt()
    @IsOptional()
    readonly idtypeincome: number | null;
}