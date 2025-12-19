import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { ReportsService } from '../services/reports.service';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportStatusDto } from '../dto/update-report-status.dto';
import { Report } from '../entities/report.entity';
import { Protected } from '../../common/decorators/protected.decorator';
import { ProtectedRoles } from '../../common/decorators/protected-roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Protected('Reports')
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @ApiOperation({ summary: 'Create report' })
    @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
    @Post()
    create(
        @Body() dto: CreateReportDto,
        @GetUser('userId') userId: number,
    ): Promise<Report> {
        return this.reportsService.create(userId, dto);
    }

    @ApiOperation({ summary: 'Get all reports' })
    @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
    @Get()
    findAll(): Promise<Report[]> {
        return this.reportsService.findAll();
    }

    @ApiOperation({ summary: 'Get reports by current user' })
    @ProtectedRoles(UserRole.USER)
    @Get('me')
    findAllByUser(@GetUser('userId') userId: number): Promise<Report[]> {
        return this.reportsService.findAllByUser(userId);
    }

    @ApiOperation({ summary: 'Get report details' })
    @ApiParam({ name: 'id', type: String })
    @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @GetUser() user: any,
    ): Promise<Report> {
        const report = await this.reportsService.findOne(id);

        if (user.role === UserRole.USER && report.user.id !== user.userId) {
            throw new ForbiddenException('You can only view your own reports');
        }

        return report;
    }

    @ApiOperation({ summary: 'Update report status' })
    @ApiParam({ name: 'id', type: String })
    @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdateReportStatusDto,
    ): Promise<Report> {
        return this.reportsService.updateStatus(id, dto.status);
    }

    @ApiOperation({ summary: 'Delete report' })
    @ApiParam({ name: 'id', type: String })
    @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.reportsService.remove(id);
    }
}
