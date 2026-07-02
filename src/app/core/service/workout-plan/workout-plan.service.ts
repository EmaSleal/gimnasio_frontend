import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { WorkoutPlan } from '../../models/workout-plan.interface';
import { ApiResponse } from '../../models/api-response.interface';
import { unwrapData } from '../unwrap-api-response';

@Injectable({
  providedIn: 'root',
})
export class WorkoutPlanService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  public getWorkoutPlans(): Observable<WorkoutPlan[]> {
    return this.http
      .get<ApiResponse<WorkoutPlan[]>>(`${baseUrl}/api/v1/workout-plans`)
      .pipe(unwrapData<WorkoutPlan[]>());
  }

  public saveWorkoutPlan(workoutPlan: any): Observable<WorkoutPlan> {
    return this.http
      .post<ApiResponse<WorkoutPlan>>(`${baseUrl}/api/v1/workout-plans`, workoutPlan)
      .pipe(unwrapData<WorkoutPlan>());
  }

  public getWorkoutPlanById(): Observable<WorkoutPlan[]> {
    const raw = this.cookieService.get('user');
    const parsed = JSON.parse(raw);
    const userId = parsed.data?.userId ?? parsed.id;
    return this.http
      .get<ApiResponse<WorkoutPlan[]>>(`${baseUrl}/api/v1/workout-plans/user/${userId}`)
      .pipe(unwrapData<WorkoutPlan[]>());
  }

  public getTemplates(): Observable<WorkoutPlan[]> {
    return this.http
      .get<ApiResponse<WorkoutPlan[]>>(`${baseUrl}/api/v1/workout-plans/templates`)
      .pipe(unwrapData<WorkoutPlan[]>());
  }

  public findById(id: number): Observable<WorkoutPlan> {
    return this.http
      .get<ApiResponse<WorkoutPlan>>(`${baseUrl}/api/v1/workout-plans/${id}`)
      .pipe(unwrapData<WorkoutPlan>());
  }

  public findByTrainer(trainerId: number): Observable<WorkoutPlan[]> {
    return this.http
      .get<ApiResponse<WorkoutPlan[]>>(`${baseUrl}/api/v1/workout-plans/trainer/${trainerId}`)
      .pipe(unwrapData<WorkoutPlan[]>());
  }

  public updateWorkoutPlan(id: number, workoutPlan: any): Observable<WorkoutPlan> {
    return this.http
      .put<ApiResponse<WorkoutPlan>>(`${baseUrl}/api/v1/workout-plans/${id}`, workoutPlan)
      .pipe(unwrapData<WorkoutPlan>());
  }

  public deleteWorkoutPlan(id: number): Observable<any> {
    return this.http
      .delete<ApiResponse<any>>(`${baseUrl}/api/v1/workout-plans/${id}`)
      .pipe(unwrapData<any>());
  }
}
