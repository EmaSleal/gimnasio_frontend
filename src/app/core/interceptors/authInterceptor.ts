import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// auth.interceptor.ts

export const AuthInterceptorFn : HttpInterceptorFn = (request, next) => {



    const user =JSON.parse( localStorage.getItem('user') || '{}')

    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    return next(request);
  
}
