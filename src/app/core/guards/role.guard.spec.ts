import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { Role } from '../models/role.enum';
import { SessionUser } from '../models/session-user.interface';
import { roleGuard } from './role.guard';

describe('roleGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let currentUser: SessionUser | null;

  beforeEach(() => {
    currentUser = null;

    router = jasmine.createSpyObj('Router', ['parseUrl', 'navigate']);
    router.parseUrl.and.callFake(
      (url: string) => ({ toString: () => url } as UrlTree)
    );

    const authSpy = jasmine.createSpyObj('AuthService', ['getCurrentUserFromCookie']);
    Object.defineProperty(authSpy, 'currentUser', {
      get: () => currentUser,
      configurable: true,
    });
    authService = authSpy;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('should be created', () => {
    expect(roleGuard(Role.ADMIN)).toBeTruthy();
  });

  it('returns true when user role matches the allowed role', () => {
    currentUser = { id: 1, role: Role.ADMIN };
    const guard = roleGuard(Role.ADMIN);
    const result = TestBed.runInInjectionContext(() => guard({} as any, {} as any));
    expect(result).toBe(true);
  });

  it('redirects to /unauthorized when authenticated user role is NOT in allowed roles', () => {
    currentUser = { id: 1, role: Role.CLIENT };
    const guard = roleGuard(Role.ADMIN);
    TestBed.runInInjectionContext(() => guard({} as any, {} as any));
    expect(router.parseUrl).toHaveBeenCalledWith('/unauthorized');
  });

  it('redirects to /login when user is not authenticated (null currentUser)', () => {
    currentUser = null;
    authService.getCurrentUserFromCookie.and.returnValue(null);
    const guard = roleGuard(Role.ADMIN);
    TestBed.runInInjectionContext(() => guard({} as any, {} as any));
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });

  it('returns true when user role is in a multi-role list (ADMIN | TRAINER)', () => {
    currentUser = { id: 2, role: Role.TRAINER };
    const guard = roleGuard(Role.ADMIN, Role.TRAINER);
    const result = TestBed.runInInjectionContext(() => guard({} as any, {} as any));
    expect(result).toBe(true);
  });
});
