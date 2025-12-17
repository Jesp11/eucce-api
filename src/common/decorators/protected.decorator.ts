import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/user-roles.guard';


export function Protected(tag = 'Protected') {
  return applyDecorators(
    ApiTags(tag),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
