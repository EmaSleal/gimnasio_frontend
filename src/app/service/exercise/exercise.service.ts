import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { tap } from 'rxjs';
import { Exercise } from '../../core/models/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  public saveExercise(exercise: Exercise): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${baseUrl}/exercise/save`, exercise)
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

  public getExercises() {
    return this.http
      .get<any>(`${baseUrl}/exercise/all`)
      .pipe(tap((res) => localStorage.setItem('user', JSON.stringify(res))));
  }
}
