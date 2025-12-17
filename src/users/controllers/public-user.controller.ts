import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from '../users.service';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponse } from '../dto/user-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


@ApiTags('Users / Public')
@Controller('users')
export class PublicUsersController {
    constructor(private readonly usersService: UsersService) {}

    //Create user
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({ description: 'The user has been successfully created.' })
    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<UserResponse> {
        return this.usersService.createUser(dto);
    }

}
