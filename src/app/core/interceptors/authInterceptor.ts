import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// auth.interceptor.ts

export const AuthInterceptorFn : HttpInterceptorFn = (request, next) => {



    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    console.log(user)
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.authenticationResponse.token}`
        }
      });
    }
    console.log(request)
    return next(request);
  
}
 