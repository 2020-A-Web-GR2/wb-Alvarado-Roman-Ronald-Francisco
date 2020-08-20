import {
    IsAlpha,
    IsDate, IsDateString,
    IsDecimal,
    IsISBN,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class UsuarioUpdateDto{
    @IsAlpha()
    @MinLength(4)
    @MaxLength(50)
    @IsNotEmpty()
    nombre: string;

    @IsAlpha()
    @MinLength(4)
    @MaxLength(50)
    @IsNotEmpty()
    apellido: string;

    @IsNotEmpty()
    @IsDecimal()
    @IsPositive()
    @IsNumber()
    sueldo: number;

    @IsNotEmpty()
    @IsDate()
    fecha_nacimiento: string;

    @IsNotEmpty()
    @IsDateString()
    fecha_hora_nacimiento: string;
}