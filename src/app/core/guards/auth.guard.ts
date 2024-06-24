import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../service/user/user.service';


//canActivate to check if the user is logged in
export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router);
  if (!userService.getUSerRoleByCookie()) {
    console.log('No estás logueado');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
