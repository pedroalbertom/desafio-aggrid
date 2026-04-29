import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePriceDto {
    @IsNumber()
    @IsNotEmpty()
    value!: number;

    @IsNumber()
    @IsNotEmpty()
    productId!: number;
}