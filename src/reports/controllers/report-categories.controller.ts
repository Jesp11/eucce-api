import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { ReportCategoriesService } from '../services/report-categories.service';
import { CreateReportCategoryDto } from '../dto/create-report-category.dto';
import { UpdateReportCategoryDto } from '../dto/update-report-category.dto';
import { ReportCategory } from '../entities/report-category.entity';
import { Protected } from '../../common/decorators/protected.decorator';
import { ProtectedRoles } from '../../common/decorators/protected-roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

@Protected('Reports / Categories')
@Controller('report-categories')
export class ReportCategoriesController {
    constructor(private readonly categoriesService: ReportCategoriesService) { }

    @ApiOperation({ summary: 'Create report category' })
    @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
    @Post()
    create(@Body() dto: CreateReportCategoryDto): Promise<ReportCategory> {
        return this.categoriesService.create(dto);
    }

    @ApiOperation({ summary: 'Get all report categories' })
    @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
    @Get()
    findAll(): Promise<ReportCategory[]> {
        return this.categoriesService.findAll();
    }

    @ApiOperation({ summary: 'Get report category by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<ReportCategory> {
        return this.categoriesService.findOne(id);
    }

    @ApiOperation({ summary: 'Update report category' })
    @ApiParam({ name: 'id', type: Number })
    @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateReportCategoryDto,
    ): Promise<ReportCategory> {
        return this.categoriesService.update(id, dto);
    }
}
