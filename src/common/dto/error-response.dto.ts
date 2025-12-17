import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 'Usuario no encontrado' })
  message: string;

  @ApiProperty({ example: '/users/10' })
  path: string;

  @ApiProperty({ example: '2025-12-16T21:35:00.000Z' })
  timestamp: string;
}
