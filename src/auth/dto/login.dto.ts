import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'Email del usuario',
    })
    @IsEmail({}, { message: 'El email debe ser válido' })
    @IsOptional()
    email: string;
   
    @ApiProperty({
        example: '80012345678',
        description: 'Teléfono del usuario',
    })
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @IsOptional()
    phone: string;
    
    @ApiProperty({
        example: 'Password123!',
        description: 'Contraseña del usuario',
        minLength: 8,
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'Confirmación de la contraseña del usuario',
        minLength: 8,
    })
    @IsString({ message: 'La confirmación de la contraseña debe ser una cadena de texto' })
    @MinLength(8, { message: 'La confirmación de la contraseña debe tener al menos 8 caracteres' })
    @IsNotEmpty({ message: 'La confirmación de la contraseña es requerida' })
    confirmPassword: string;
}