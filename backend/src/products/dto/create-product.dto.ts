import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    supplierId!: number;
}