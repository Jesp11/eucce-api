import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
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
    example: '80012345678',
    description: 'Teléfono del usuario',
  })
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
    example: UserRole.USER ,
    description: 'Rol del usuario',
  })
  @IsNotEmpty({ message: 'El rol es requerido' })
  @IsEnum([UserRole.USER, UserRole.EMPLOYEE], { message: 'El rol debe ser un valor válido (USER, EMPLOYEE)' })
  role: UserRole;
}