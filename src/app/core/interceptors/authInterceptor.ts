import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

// auth.interceptor.ts

export const AuthInterceptorFn : HttpInterceptorFn = (request: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
    const cookieService = inject(CookieService);

    const user = cookieService.get('user');

    if (user) {
      const jwt = JSON.parse(user);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt.authenticationResponse.token}`
        }
      });
      console.log(request);
    }

    return next(request);
  
}
 