import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Role } from '../models/role.enum';

export function roleGuard(...roles: Role[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.currentUser ?? authService.getCurrentUserFromCookie();
    if (!user) {
      return router.parseUrl('/login');
    }
    if (!roles.includes(user.role)) {
      return router.parseUrl('/unauthorized');
    }
    return true;
  };
}
