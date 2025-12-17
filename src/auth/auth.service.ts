import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { UsersRepository } from '../users/repository/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login( dto: LoginDto ): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Las contraseñas no coinciden');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tokenType: 'ACCESS',
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
  
}
