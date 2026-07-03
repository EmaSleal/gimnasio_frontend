import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

const attachToken = (req: HttpRequest<unknown>, cookieService: CookieService): HttpRequest<unknown> => {
  const raw = cookieService.get('user');
  if (!raw) return req;
  try {
    const jwt = JSON.parse(raw);
    if (!jwt?.data?.accessToken) return req;
    return req.clone({ setHeaders: { Authorization: `Bearer ${jwt.data.accessToken}` } });
  } catch {
    return req;
  }
};

export const AuthInterceptorFn: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(attachToken(request, cookieService)).pipe(
    catchError((err: HttpErrorResponse) => {
      const onLogin = router.url.startsWith('/login');
      const isRefreshCall = request.url.includes('/auth/refresh');

      if (err.status === 401 && !onLogin && !isRefreshCall) {
        return authService.refresh().pipe(
          switchMap(() => next(attachToken(request, cookieService))),
          catchError(() => {
            authService.logout();
            return throwError(() => err);
          })
        );
      }

      if (err.status === 403) {
        router.navigateByUrl('/unauthorized');
      }

      return throwError(() => err);
    })
  );
};
