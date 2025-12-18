import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repository/users.repository';
import { PublicUsersController } from './controllers/public-user.controller';
import { UsersInitService } from './services/user-init.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UsersService, UsersInitService],
  controllers: [UsersController, PublicUsersController ]
})
export class UsersModule {}
