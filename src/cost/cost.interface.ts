import { IsNumber, IsEnum, IsInt, IsString, IsUUID, isNumber, IsOptional } from 'class-validator';

export enum StatusRole {
    pendente = "pendente",
    pago = "pago"
}

export class CostDto {
    @IsString()
    readonly motivation: string;

    @IsNumber()
    readonly price: number;

    @IsInt()
    readonly idtypecost: number;

    @IsInt()
    @IsOptional()
    readonly idcard: number;

    @IsEnum(StatusRole)
    readonly status: string;

    @IsString()
    @IsOptional()
    readonly data: string;
}