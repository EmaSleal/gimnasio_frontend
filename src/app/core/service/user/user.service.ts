import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private router: Router) {}

    public addUser (user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(`${baseUrl}/user/save`, user)
                .subscribe(
                    (res) => {
                        resolve(res);
                    },
                    (err) => {
                        reject(err);
                    }
                );
        });
    
  }
  public getUser(idUser: string): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${baseUrl}/user/id/${idUser}`)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  public getUsers(): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${baseUrl}/user/all`)
        .subscribe(
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
      this.http
        .delete(`${baseUrl}/user/delete/${id}`)
        .subscribe(
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
      this.http
        .put(`${baseUrl}/user/update`, value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  public getUserById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${baseUrl}/user/id/${id}`)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  } 
}
