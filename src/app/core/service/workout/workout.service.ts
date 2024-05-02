import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { tap } from 'rxjs';
import { Workout } from '../../models/workout.interface';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  
  public saveWorkout(exercise: Workout): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${baseUrl}/workout/save`, exercise)
        .pipe(
          tap((res) => {
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
    });
  }

  constructor(private http: HttpClient) { }

  public getWorkouts() {
    return this.http
      .get<any>(`${baseUrl}/workout/all`)
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  deleteWorkout(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${baseUrl}/workout/delete/${id}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public getWorkout(id: string): Promise<Workout> {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/workout/id/${id}`).subscribe(
        (res) => {
          resolve(res as Workout);
        },
        (err) => {
          reject(err); 
        }
      );
    });
  }
}
