import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../../service/login/login.service";

// auth.guard.ts
@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isAuthenticated()) {
        console.log('Paso el guard');
        return true;
      } else {
        console.log('Bloqueado por el guard');
        return this.router.createUrlTree(['/login']);
      }
    }
  }
  