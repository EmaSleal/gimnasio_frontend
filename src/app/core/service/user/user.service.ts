import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import baseUrl from '../helper';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { ApiResponse } from '../../models/api-response.interface';
import { unwrapData } from '../unwrap-api-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  public addUser(user: any): Observable<User> {
    const raw = this.cookieService.get('user');
    if (raw) {
      const parsed = JSON.parse(raw);
      user.createdBy = parsed.data?.userId ?? parsed.id;
    }
    return this.http
      .post<ApiResponse<User>>(`${baseUrl}/api/v1/users`, user)
      .pipe(unwrapData<User>());
  }

  public getUser(id: number | string): Observable<User> {
    return this.http
      .get<ApiResponse<User>>(`${baseUrl}/api/v1/users/${id}`)
      .pipe(unwrapData<User>());
  }

  public getUsers(): Observable<User[]> {
    return this.http
      .get<ApiResponse<User[]>>(`${baseUrl}/api/v1/users`)
      .pipe(unwrapData<User[]>());
  }

  public deleteUser(id: number): Observable<any> {
    return this.http
      .delete<ApiResponse<any>>(`${baseUrl}/api/v1/users/${id}`)
      .pipe(unwrapData<any>());
  }

  public updateUser(id: number, value: any): Observable<User> {
    return this.http
      .put<ApiResponse<User>>(`${baseUrl}/api/v1/users/${id}`, value)
      .pipe(unwrapData<User>());
  }

  /** @deprecated Use the paginated user list endpoint instead. Will be removed in a future cleanup. */
  public getUserById(id: number | string): Observable<User> {
    return this.getUser(id);
  }

  public getUsersCreatedBy(): Observable<User[]> {
    const raw = this.cookieService.get('user');
    const parsed = JSON.parse(raw);
    const trainerId = parsed.data?.userId ?? parsed.id;
    return this.http
      .get<ApiResponse<User[]>>(`${baseUrl}/api/v1/users/trainer/${trainerId}/clients`)
      .pipe(unwrapData<User[]>());
  }

  public getUserByCookie(): Observable<User> {
    const raw = this.cookieService.get('user');
    const parsed = JSON.parse(raw);
    const userId = parsed.data?.userId ?? parsed.id;
    return this.http
      .get<ApiResponse<User>>(`${baseUrl}/api/v1/users/${userId}`)
      .pipe(unwrapData<User>());
  }

  public getUserRoleFromCookie(): boolean {
    const raw = this.cookieService.get('user');
    return raw !== null && raw !== '';
  }
}
