import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReportCategory } from "./report-category.entity";
import { User } from "../../users/entities/user.entity";
import { ReportStatus } from "../enums/report-status.enum";

@Entity()
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, type: 'varchar', nullable: false })
    folio: string;

    @Column({ name: 'category_id' })
    categoryId: number;

    @ManyToOne(() => ReportCategory, (category) => category.reports)
    @JoinColumn({ name: 'category_id' })
    category: ReportCategory;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'imagen_url', nullable: true })
    imageUrl: string;

    @Column({ type: 'text', nullable: true })
    details: string;

    @Column({ name: 'location_references', type: 'text', nullable: true })
    locationReferences: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: false })
    latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: false })
    longitude: number;

    @Column({
        type: 'varchar',
        default: ReportStatus.PENDING,
        enum: ReportStatus
    })
    status: ReportStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
