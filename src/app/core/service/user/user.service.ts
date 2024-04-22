import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import baseUrl from '../helper';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router,private cookieService: CookieService) {}

  public addUser(user: any): Promise<any> {
    //add to user the property createdBy
    let userCreator= {} as User;
    return new Promise((resolve, reject) => {
      Promise.resolve(this.cookieService.get('user')).then((res) => {
        if(res !== null && res !== ''){
        //console.log(res);
        userCreator = JSON.parse(res);
        user.createdBy = userCreator.id;
      this.http.post(`${baseUrl}/user/save`, user).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    }});
    });
  }

  public getUser(idUser: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/user/id/${idUser}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/user/all`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deleteUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${baseUrl}/user/delete/${id}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public updateUser(value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${baseUrl}/user/update`, value).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public getUserById(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/user/id/${id}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  public getUsersCreatedBy(): Promise<any> {
    let user= {} as User;
    
    //console.log(user);
    return new Promise((resolve, reject) => {
      Promise.resolve(this.cookieService.get('user')).then((res) => {
      if(res !== null && res !== ''){
      //console.log(res);
      user = JSON.parse(res);

      this.http.get(`${baseUrl}/user/createdBy/${user.id}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    }
    });
    });
      
  }
  
}
