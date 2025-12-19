import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { ReportStatus } from "../enums/report-status.enum";

export class UpdateReportStatusDto {
    @ApiProperty({
        enum: ReportStatus,
        description: 'Nuevo estatus del reporte'
    })
    @IsEnum(ReportStatus)
    @IsNotEmpty()
    status: ReportStatus;
}
