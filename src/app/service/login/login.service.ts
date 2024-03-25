import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
      //si existe el usuario en el localstorage
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }


  
  public login(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${baseUrl}/Login`, user)
        .pipe(
          tap((res) => {
            localStorage.setItem('user', JSON.stringify(res));
            resolve(res);
          })
        )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    }
    );
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
