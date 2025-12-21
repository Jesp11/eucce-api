import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponse } from '../dto/user-response.dto';
import { BCRYPT_SALT_ROUNDS } from '../constants/bcrypt.constants';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../common/enums/role.enum';
import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_PHONE } from '../constants/user-admin.constants';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getAllUsers() {
        return this.usersRepository.findAllUsers();
    }

    async getUserById(id: number) {
        const existUser = await this.usersRepository.findUserById(id);
        if (!existUser) throw new NotFoundException(`El usuario con ID:${id} no existe.`);
        
        return existUser
    }

    async createUser(dto: CreateUserDto) {
        if (dto.password !== dto.confirmPassword) {
            throw new ConflictException('La contraseña y la confirmación de la contraseña no coinciden.');
        }

        if (await this.usersRepository.validateField('email', dto.email)) {
            throw new ConflictException(`El email ${dto.email} ya está en uso.`);
        }
        
        if (await this.usersRepository.validateField('phone', dto.phone)) {
            throw new ConflictException(`El teléfono ${dto.phone} ya está en uso.`);
        }

        dto.password = await this.hashPassword(dto.password);
        
        return this.usersRepository.createUser(dto);
    }
    
    async updateUser( id: number, dto: UpdateUserDto): Promise<UserResponse | null> {
        const user = await this.usersRepository.findUserById(id);
        if (!user) throw new NotFoundException( `El usuario con ID:${id} no existe.` );
        if( await this.usersRepository.validateField('curp', dto.curp) && dto.curp !== user.curp ){
            throw new ConflictException(`La CURP:${dto.curp} ya está en uso.`);
        }
        
        return this.usersRepository.updateUser(id, dto);
    }

    async toggleUserStatus(id: number) {
        const existUser = await this.usersRepository.findUserById(id);
        if (!existUser) throw new NotFoundException(`El usuario con ID:${id} no existe.`);
        
        existUser.isActive = !existUser.isActive;

        return this.usersRepository.toggleStatus(existUser);
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = Number(BCRYPT_SALT_ROUNDS);
        return bcrypt.hash(password, saltRounds);
    }

    async getAdmins() {
        return this.usersRepository.find({ where: { role: UserRole.ADMIN } });
    }

    async createUserAdmin(): Promise<Boolean | null> {
        if (await this.usersRepository.validateField('email', ADMIN_EMAIL)) {
            throw new ConflictException(`El email ${ADMIN_EMAIL} ya está en uso.`);
        }
        if (await this.usersRepository.validateField('phone', ADMIN_PHONE)) {
            throw new ConflictException(`El teléfono ${ADMIN_PHONE} ya está en uso.`);
        }
        const hashedPassword = await this.hashPassword(ADMIN_PASSWORD);
        
        const adminDto: Partial<CreateUserDto> = {
            email: ADMIN_EMAIL,
            password: hashedPassword,
            phone: ADMIN_PHONE,
            role: UserRole.ADMIN,
        };

        const result = await this.usersRepository.createUser(adminDto);

        return result ? true : false;
    }
}