import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  public getExercises() {
    return this.http
      .get<any>(`${baseUrl}/exercise/all`)
      .pipe(tap((res) => localStorage.setItem('user', JSON.stringify(res))));
  }
}
