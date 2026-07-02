import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptorFn: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const user = cookieService.get('user');
  if (user) {
    const jwt = JSON.parse(user);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt.data.accessToken}`,
      },
    });
  }

  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      const onLogin = router.url.startsWith('/login');
      if (err.status === 401 && !onLogin) {
        cookieService.delete('user');
        router.navigateByUrl('/login');
      } else if (err.status === 403) {
        router.navigateByUrl('/unauthorized');
      }
      return throwError(() => err);
    })
  );
};
