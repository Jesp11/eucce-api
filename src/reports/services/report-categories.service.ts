import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportCategory } from '../entities/report-category.entity';
import { CreateReportCategoryDto } from '../dto/create-report-category.dto';
import { UpdateReportCategoryDto } from '../dto/update-report-category.dto';

@Injectable()
export class ReportCategoriesService {
    constructor(
        @InjectRepository(ReportCategory)
        private readonly categoryRepository: Repository<ReportCategory>,
    ) { }

    async create(dto: CreateReportCategoryDto): Promise<ReportCategory> {
        const category = this.categoryRepository.create(dto);
        return this.categoryRepository.save(category);
    }

    async findAll(): Promise<ReportCategory[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<ReportCategory> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async update(id: number, dto: UpdateReportCategoryDto): Promise<ReportCategory> {
        const category = await this.findOne(id);
        Object.assign(category, dto);
        return this.categoryRepository.save(category);
    }

    async remove(id: number): Promise<void> {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }
}
