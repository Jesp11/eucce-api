import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    EMPLOYEE = 'empleado',
    USER = 'usuario'
}

@Entity()
@Index(['role', 'isActive'])
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true, nullable: false, type: 'varchar' })
    email: string;
    
    @Column({ unique: true, nullable: false, type: 'varchar' })
    phone: string;

    @Column({ nullable: false, type: 'varchar' })
    password: string;

    @Column({ nullable: false, type: 'boolean', default: true })
    isActive: boolean;

    @Column({ nullable: true, type: 'varchar' })
    name: string;

    @Column({ nullable: true, type: 'varchar' })
    lastName: string;

    @Column({ unique: true, nullable: true, type: 'varchar' })
    @Index()
    curp: string;

    @Column({ nullable: true, type: 'varchar' })
    postalCode: string;

    @Column({ 
        nullable: false, 
        type: 'varchar', 
        default: UserRole.USER, 
        enum: UserRole 
    })
    role: UserRole;

    @Index() 
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}