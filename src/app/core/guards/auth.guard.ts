import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

interface AuthCookie {
  data?: {
    accessToken?: string;
    role?: string;
  };
}

export const authGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const raw = cookieService.get('user');
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as AuthCookie;
      if (parsed?.data?.accessToken && parsed?.data?.role) {
        return true;
      }
    } catch {
      // malformed cookie — fall through to deny
    }
  }

  return router.parseUrl('/login');
};
