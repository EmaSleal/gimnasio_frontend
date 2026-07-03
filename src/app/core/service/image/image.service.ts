import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Observable } from 'rxjs';
import { ImageResponse } from '../../models/image.interface';
import { ApiResponse } from '../../models/api-response.interface';
import { unwrapData } from '../unwrap-api-response';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  public uploadImages(workoutId: string | number, files: File[]): Observable<ImageResponse[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file, file.name));

    return this.http
      .post<ApiResponse<ImageResponse[]>>(`${baseUrl}/api/v1/images/workout/${workoutId}`, formData)
      .pipe(unwrapData<ImageResponse[]>());
  }

  public getImagesByWorkout(workoutId: string | number): Observable<ImageResponse[]> {
    return this.http
      .get<ApiResponse<ImageResponse[]>>(`${baseUrl}/api/v1/images/workout/${workoutId}`)
      .pipe(unwrapData<ImageResponse[]>());
  }

  public uploadImagesForMuscularGroup(muscularGroupId: string | number, files: File[]): Observable<ImageResponse[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file, file.name));

    return this.http
      .post<ApiResponse<ImageResponse[]>>(`${baseUrl}/api/v1/images/muscular-group/${muscularGroupId}`, formData)
      .pipe(unwrapData<ImageResponse[]>());
  }

  public getImagesByMuscularGroup(muscularGroupId: string | number): Observable<ImageResponse[]> {
    return this.http
      .get<ApiResponse<ImageResponse[]>>(`${baseUrl}/api/v1/images/muscular-group/${muscularGroupId}`)
      .pipe(unwrapData<ImageResponse[]>());
  }

  public deleteImage(id: string | number): Observable<any> {
    return this.http
      .delete<ApiResponse<any>>(`${baseUrl}/api/v1/images/${id}`)
      .pipe(unwrapData<any>());
  }
}
