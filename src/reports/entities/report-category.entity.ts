import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Report } from "./report.entity";

@Entity()
export class ReportCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Report, (report) => report.category)
    reports: Report[];
}
