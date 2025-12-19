import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReportCategoryDto {
    @ApiProperty({
        example: 'Infraestructura',
        description: 'Nombre de la categoría'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Reportes relacionados con daños en infraestructura',
        description: 'Descripción de la categoría',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;
}
