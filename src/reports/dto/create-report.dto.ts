import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";

export class CreateReportDto {
    @ApiProperty({
        example: 1,
        description: 'ID de la categoría del reporte'
    })
    @IsInt()
    @IsNotEmpty()
    category_id: number;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
        description: 'URL de la imagen del reporte',
        required: false
    })
    @IsUrl()
    @IsOptional()
    imagen_url: string;

    @ApiProperty({
        example: 'Bache en la calle principal',
        description: 'Detalles del reporte',
        required: false
    })
    @IsString()
    @IsOptional()
    details: string;

    @ApiProperty({
        example: 'Frente a la tienda',
        description: 'Referencias de ubicación',
        required: false
    })
    @IsString()
    @IsOptional()
    location_references: string;

    @ApiProperty({
        example: 19.432608,
        description: 'Latitud'
    })
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @ApiProperty({
        example: -99.133209,
        description: 'Longitud'
    })
    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}
