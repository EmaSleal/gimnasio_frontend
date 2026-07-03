import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs/operators';
import { Role } from '../../models/role.enum';
import { SessionUser } from '../../models/session-user.interface';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<SessionUser | null>(null);

  readonly currentUser$: Observable<SessionUser | null> = this.currentUserSubject.asObservable();

  private refreshInProgress$: Observable<any> | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {
    this.getCurrentUserFromCookie();
  }

  get currentUser(): SessionUser | null {
    return this.currentUserSubject.getValue();
  }

  get isAuthenticated(): boolean {
    return this.currentUserSubject.getValue() !== null;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === Role.ADMIN;
  }

  get isTrainer(): boolean {
    return this.currentUser?.role === Role.TRAINER;
  }

  get isClient(): boolean {
    return this.currentUser?.role === Role.CLIENT;
  }

  login(credentials: any): Observable<any> {
    return this.http
      .post(`${baseUrl}/api/v1/auth/login`, credentials)
      .pipe(
        tap((res: any) => {
          this.cookieService.set('user', JSON.stringify(res), { path: '/' });
          this.setSession(res.data);
        })
      );
  }

  refresh(): Observable<any> {
    if (this.refreshInProgress$) {
      return this.refreshInProgress$;
    }

    const raw = this.cookieService.get('user');
    const refreshToken = raw ? JSON.parse(raw)?.data?.refreshToken : null;
    this.refreshInProgress$ = this.http
      .post(`${baseUrl}/api/v1/auth/refresh`, { refreshToken })
      .pipe(
        tap((res: any) => {
          this.cookieService.set('user', JSON.stringify(res), { path: '/' });
          this.setSession(res.data);
        }),
        finalize(() => {
          this.refreshInProgress$ = null;
        }),
        shareReplay(1)
      );
    return this.refreshInProgress$;
  }

  logout(): void {
    this.cookieService.delete('user', '/');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }

  getCurrentUserFromCookie(): SessionUser | null {
    const raw = this.cookieService.get('user');
    if (!raw) {
      this.currentUserSubject.next(null);
      return null;
    }
    try {
      const parsed = JSON.parse(raw);
      const data = parsed?.data;
      if (data?.userId != null && data?.role) {
        const sessionUser: SessionUser = {
          id: data.userId,
          role: data.role as Role,
          username: data.username,
        };
        this.currentUserSubject.next(sessionUser);
        return sessionUser;
      }
      this.currentUserSubject.next(null);
      return null;
    } catch {
      this.currentUserSubject.next(null);
      return null;
    }
  }

  private setSession(data: { userId: number; role: string; username?: string }): void {
    if (data?.userId != null && data?.role) {
      this.currentUserSubject.next({
        id: data.userId,
        role: data.role as Role,
        username: data.username as string,
      });
    }
  }
}
