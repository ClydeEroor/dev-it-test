import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/role.guard';

export const GUARDS = [JwtAuthGuard, RolesGuard];
