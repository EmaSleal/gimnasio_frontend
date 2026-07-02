import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Observable } from 'rxjs';
import { MuscularGroup } from '../../models/muscular-group.interface';
import { ApiResponse } from '../../models/api-response.interface';
import { unwrapData } from '../unwrap-api-response';

@Injectable({
  providedIn: 'root'
})
export class MuscularGroupService {

  constructor(private http: HttpClient) {}

  public getMuscularGroups(): Observable<MuscularGroup[]> {
    return this.http
      .get<ApiResponse<MuscularGroup[]>>(`${baseUrl}/api/v1/muscular-groups`)
      .pipe(unwrapData<MuscularGroup[]>());
  }

  public saveMuscularGroup(muscularGroup: any): Observable<MuscularGroup> {
    return this.http
      .post<ApiResponse<MuscularGroup>>(`${baseUrl}/api/v1/muscular-groups`, muscularGroup)
      .pipe(unwrapData<MuscularGroup>());
  }

  public deleteMuscularGroup(id: string | number): Observable<any> {
    return this.http
      .delete<ApiResponse<any>>(`${baseUrl}/api/v1/muscular-groups/${id}`)
      .pipe(unwrapData<any>());
  }

  public getMuscularGroup(id: string | number): Observable<MuscularGroup> {
    return this.http
      .get<ApiResponse<MuscularGroup>>(`${baseUrl}/api/v1/muscular-groups/${id}`)
      .pipe(unwrapData<MuscularGroup>());
  }

  public updateMuscularGroup(id: string | number, muscularGroup: any): Observable<MuscularGroup> {
    return this.http
      .put<ApiResponse<MuscularGroup>>(`${baseUrl}/api/v1/muscular-groups/${id}`, muscularGroup)
      .pipe(unwrapData<MuscularGroup>());
  }
}
