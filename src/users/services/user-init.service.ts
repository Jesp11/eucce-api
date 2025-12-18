import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';


@Injectable()
export class UsersInitService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    const admins = await this.usersService.getAdmins();
    if (!admins || admins.length === 0) {
      const result = await this.usersService.createUserAdmin();
      const msg = result ? 'Usuario administrador creado correctamente.' : 'No se pudo crear el usuario administrador.';
      Logger.log(msg, 'UsersInitService');
    }
  }
}