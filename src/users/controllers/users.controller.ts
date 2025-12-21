import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiParam} from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponse } from '../dto/user-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRole } from '../../common/enums/role.enum';
import { Protected } from '../../common/decorators/protected.decorator';
import { ProtectedRoles } from '../../common/decorators/protected-roles.decorator';


@Protected('Users / Protected')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get()
  async getAllUsers(): Promise<UserResponse[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse | null> {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Create user, request from web' })
  @ProtectedRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserResponse> {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ProtectedRoles(UserRole.USER)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponse | null> {
    return this.usersService.updateUser(id, dto);
  }

  @ApiOperation({ summary: 'Toggle user status' })
  @ProtectedRoles(UserRole.ADMIN)
  @Patch('status/:id')
  async toggleUserStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse | null> {
    return this.usersService.toggleUserStatus(id);
  }
}

