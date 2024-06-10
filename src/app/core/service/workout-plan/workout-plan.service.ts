import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkoutPlanService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public getWorkoutPlans(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/workoutPlan/all`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public saveWorkoutPlan(workoutPlan: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${baseUrl}/workoutPlan/save`, workoutPlan).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public getWorkoutPlanById(): Promise<any> {
    let userCreator = {} as User;
    return new Promise((resolve, reject) => {
      Promise.resolve(this.cookieService.get('user')).then((res) => {
        if (res !== null && res !== '') {
          userCreator = JSON.parse(res);
          this.http
            .get(`${baseUrl}/workoutPlan/idUser/${userCreator.id}`)
            .subscribe(
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

  public getTemplates(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/workoutPlan/getTemplates`).subscribe(
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
