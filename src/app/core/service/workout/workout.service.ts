import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Observable } from 'rxjs';
import { Workout } from '../../models/workout.interface';
import { ApiResponse } from '../../models/api-response.interface';
import { unwrapData } from '../unwrap-api-response';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) {}

  public saveWorkout(workout: Workout): Observable<Workout> {
    return this.http
      .post<ApiResponse<Workout>>(`${baseUrl}/api/v1/workouts`, workout)
      .pipe(unwrapData<Workout>());
  }

  public getWorkouts(): Observable<Workout[]> {
    return this.http
      .get<ApiResponse<Workout[]>>(`${baseUrl}/api/v1/workouts`)
      .pipe(unwrapData<Workout[]>());
  }

  public deleteWorkout(id: string | number): Observable<any> {
    return this.http
      .delete<ApiResponse<any>>(`${baseUrl}/api/v1/workouts/${id}`)
      .pipe(unwrapData<any>());
  }

  public getWorkout(id: string | number): Observable<Workout> {
    return this.http
      .get<ApiResponse<Workout>>(`${baseUrl}/api/v1/workouts/${id}`)
      .pipe(unwrapData<Workout>());
  }

  public updateWorkout(id: string | number, workout: any): Observable<Workout> {
    return this.http
      .put<ApiResponse<Workout>>(`${baseUrl}/api/v1/workouts/${id}`, workout)
      .pipe(unwrapData<Workout>());
  }

  public getWorkoutsByMuscularGroup(muscularGroupId: string | number): Observable<Workout[]> {
    return this.http
      .get<ApiResponse<Workout[]>>(`${baseUrl}/api/v1/workouts/muscular-group/${muscularGroupId}`)
      .pipe(unwrapData<Workout[]>());
  }
}
