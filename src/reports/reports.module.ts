import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportCategory } from './entities/report-category.entity';
import { ReportsController } from './controllers/reports.controller';
import { ReportCategoriesController } from './controllers/report-categories.controller';
import { ReportsService } from './services/reports.service';
import { ReportCategoriesService } from './services/report-categories.service';

@Module({
    imports: [TypeOrmModule.forFeature([Report, ReportCategory])],
    controllers: [ReportsController, ReportCategoriesController],
    providers: [ReportsService, ReportCategoriesService],
    exports: [ReportsService]
})
export class ReportsModule { }
