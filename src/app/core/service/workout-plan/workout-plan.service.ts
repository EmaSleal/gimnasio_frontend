import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class WorkoutPlanService {

  constructor(private http: HttpClient) { }


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
      this.http
        .post(`${baseUrl}/workoutPlan/save`, workoutPlan)
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
