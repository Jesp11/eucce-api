import { applyDecorators } from '@nestjs/common';
import { Roles } from '../../auth/decorator/roles.decorator';
import { UserRole } from '../enums/role.enum';


export function ProtectedRoles(...roles: UserRole[]) {
  return applyDecorators(
    Roles(...roles),
  );
}
