import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { ReportCategory } from '../entities/report-category.entity';
import { CreateReportDto } from '../dto/create-report.dto';
import { ReportStatus } from '../enums/report-status.enum';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
        @InjectRepository(ReportCategory)
        private readonly categoryRepository: Repository<ReportCategory>,
    ) { }

    async create(userId: number, dto: CreateReportDto): Promise<Report> {
        const category = await this.categoryRepository.findOne({ where: { id: dto.category_id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${dto.category_id} not found`);
        }

        const folio = await this.generateFolio(category.name);

        const report = this.reportRepository.create({
            category: { id: dto.category_id },
            user: { id: userId },
            imageUrl: dto.imagen_url,
            details: dto.details,
            locationReferences: dto.location_references,
            latitude: dto.latitude,
            longitude: dto.longitude,
            status: ReportStatus.PENDING,
            folio
        });
        return this.reportRepository.save(report);
    }

    private async generateFolio(categoryName: string): Promise<string> {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        // Add hours and minutes to ensure better uniqueness without random
        const time = String(date.getHours()).padStart(2, '0') + String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const categoryPrefix = categoryName.substring(0, 3).toUpperCase();

        // REP-{CAT}-{YYYYMMDD}-{HHMMSS}
        return `REP${categoryPrefix}-${year}${month}${day}${time}${seconds}`;
    }

    async findAll(): Promise<Report[]> {
        return this.reportRepository.find({
            relations: ['category', 'user'],
            order: { createdAt: 'DESC' }
        });
    }

    async findAllByUser(userId: number): Promise<Report[]> {
        return this.reportRepository.find({
            where: { user: { id: userId } },
            relations: ['category'],
            order: { createdAt: 'DESC' }
        });
    }

    async findOne(id: string): Promise<Report> {
        const report = await this.reportRepository.findOne({
            where: { id },
            relations: ['category', 'user']
        });
        if (!report) {
            throw new NotFoundException(`Report with ID ${id} not found`);
        }
        return report;
    }

    async updateStatus(id: string, status: ReportStatus): Promise<Report> {
        const report = await this.findOne(id);
        report.status = status;
        return this.reportRepository.save(report);
    }

    async remove(id: string): Promise<void> {
        const result = await this.reportRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Report with ID ${id} not found`);
        }
    }
}
