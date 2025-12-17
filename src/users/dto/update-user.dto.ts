import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {

  @ApiPropertyOptional({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'Pérez',
    description: 'Apellido del usuario',
  })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    example: 'ABCD800123HDFRRL09',
    description: 'CURP del usuario',
  })
  @IsString({ message: 'La CURP debe ser una cadena de texto' })
  @IsOptional()
  curp?: string;

  @ApiPropertyOptional({
    example: "10160",
    description: 'Código postal del usuario',
    minLength: 5,
    maxLength: 5,
  })
  @IsString({ message: 'El código postal debe ser una cadena de texto' })
  @IsOptional()
  postalCode?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado del usuario (activo/inactivo)',
  })
  @IsBoolean({ message: 'El estado debe ser un valor booleano' })
  @IsOptional()
  isActive?: boolean;
 
}