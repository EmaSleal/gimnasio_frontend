import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  isAuthenticated(): boolean {
      //si existe el usuario en el localstorage
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }


  
  public login(user: any): Promise<any> {
    console.log(user);
    return new Promise((resolve, reject) => {
      this.http
        .post(`${baseUrl}/Login`, user)
        .pipe(
          tap((res) => {
            this.cookieService.set('user', JSON.stringify(res));
            resolve(res);
            this.router.navigate(['/exercise']);
          })
          
        )
        .subscribe(
          (res) => {
            resolve(res);
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido',
              text: 'Inicio de sesión exitoso',
            });
          },
          (err) => {
            reject(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario o contraseña incorrectos',
            });
          }
        );
    }
    );
  }

  public logout() {
    this.cookieService.delete('user');
    this.router.navigateByUrl('/login');
  }
}
