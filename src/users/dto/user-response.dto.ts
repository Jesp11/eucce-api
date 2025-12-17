import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../entities/user.entity";

export class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: UserRole;
    
  @ApiProperty()
  isActive: boolean;
  
  @ApiProperty()
  password: string;

  @ApiProperty()
  curp: string;
  
}