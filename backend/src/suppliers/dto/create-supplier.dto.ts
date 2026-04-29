import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
    @IsString()
    @IsNotEmpty({ message: 'O nome do fornecedor é obrigatório' })
    name!: string;

    @IsEmail({}, { message: 'E-mail inválido' })
    @IsOptional()
    email?: string;
}
