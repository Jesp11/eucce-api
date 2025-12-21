import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserResponse } from "../dto/user-response.dto";


@Injectable()
export class UsersRepository {
    constructor( @InjectRepository(User) private readonly repository: Repository<User>) {}

    async findAllUsers(): Promise<UserResponse[]> {
        return this.repository.find();
    }

    async findUserById(id: number): Promise<UserResponse | null> {
        return this.repository.findOneBy({ id });
    }

    async createUser(data: CreateUserDto | Partial<CreateUserDto>): Promise<UserResponse> {
        const newUser = this.repository.create(data);
        return this.repository.save(newUser);
    }

    async updateUser(id:number, user: Partial<UpdateUserDto>): Promise<UserResponse> {
        return this.repository.save({ id, ...user });
    }

    async toggleStatus(dto: Partial<UpdateUserDto>): Promise<UserResponse> {
        return this.repository.save(dto);
    }

    async validateField(field: keyof User, value: any): Promise<boolean> {;
        return await this.repository.countBy({ [field]: value }) > 0;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }

    async find( options: object ): Promise<User[] | null> {
        return this.repository.find( options );
    }
}