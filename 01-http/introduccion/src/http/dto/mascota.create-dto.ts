import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

// @IsAlpha()
// @IsNotEmpty()
// @MinLength()
// @MaxLength()
// @IsBoolean()
// @IsEmpty()
// @IsInt()
// @IsPositive()
// @IsOptional()
// @IsNumber()


export class MascotaCeateDto {
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    @IsNotEmpty()
    nombre:string;

    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    edad:number;

    @IsBoolean()
    @IsNotEmpty()
    casada:boolean;

    @IsBoolean()
    @IsOptional()
    ligada?:boolean;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    peso:number;
}
