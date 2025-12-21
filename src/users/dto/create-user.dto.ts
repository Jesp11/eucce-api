import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email del usuario',
  })
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({
    example: '8001234567',
    description: 'Teléfono del usuario',
  })
  @Length(10, 10, { message: 'El teléfono debe tener exactamente 10 caracteres' })
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono es requerido' })
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

  @ApiProperty({
    example: UserRole.USER ,
    description: 'Rol del usuario',
  })
  @IsOptional({ message: 'El rol es requerido' })
  @IsEnum([UserRole.USER, UserRole.EMPLOYEE], { message: 'El rol debe ser un valor válido (USER, EMPLOYEE)' })
  role: UserRole;
}