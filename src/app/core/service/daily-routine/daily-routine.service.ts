import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Observable } from 'rxjs';
import { DailyRoutine } from '../../models/daily-routine.interface';
import { ApiResponse } from '../../models/api-response.interface';
import { unwrapData } from '../unwrap-api-response';

@Injectable({
  providedIn: 'root'
})
export class DailyRoutineService {

  constructor(private http: HttpClient) {}

  public findById(id: number): Observable<DailyRoutine> {
    return this.http
      .get<ApiResponse<DailyRoutine>>(`${baseUrl}/api/v1/daily-routines/${id}`)
      .pipe(unwrapData<DailyRoutine>());
  }

  public findByWorkoutPlan(workoutPlanId: number): Observable<DailyRoutine[]> {
    return this.http
      .get<ApiResponse<DailyRoutine[]>>(`${baseUrl}/api/v1/daily-routines/plan/${workoutPlanId}`)
      .pipe(unwrapData<DailyRoutine[]>());
  }

  public create(dailyRoutine: any): Observable<DailyRoutine> {
    return this.http
      .post<ApiResponse<DailyRoutine>>(`${baseUrl}/api/v1/daily-routines`, dailyRoutine)
      .pipe(unwrapData<DailyRoutine>());
  }

  public update(id: number, dailyRoutine: any): Observable<DailyRoutine> {
    return this.http
      .put<ApiResponse<DailyRoutine>>(`${baseUrl}/api/v1/daily-routines/${id}`, dailyRoutine)
      .pipe(unwrapData<DailyRoutine>());
  }

  public delete(id: number): Observable<any> {
    return this.http
      .delete<ApiResponse<any>>(`${baseUrl}/api/v1/daily-routines/${id}`)
      .pipe(unwrapData<any>());
  }
}
