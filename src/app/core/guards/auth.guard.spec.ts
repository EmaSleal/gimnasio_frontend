import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let cookieService: jasmine.SpyObj<CookieService>;
  let router: jasmine.SpyObj<Router>;

  const runGuard: CanActivateFn = (...args) =>
    TestBed.runInInjectionContext(() => authGuard(...args));

  beforeEach(() => {
    cookieService = jasmine.createSpyObj('CookieService', ['get', 'check']);
    router = jasmine.createSpyObj('Router', ['parseUrl', 'navigate']);
    router.parseUrl.and.callFake(
      (url: string) => ({ toString: () => url } as UrlTree)
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: cookieService },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('should be created', () => {
    expect(runGuard).toBeTruthy();
  });

  it('valid cookie with accessToken and role: returns true', () => {
    cookieService.get.and.returnValue(
      JSON.stringify({
        data: { accessToken: 'tok123', role: 'ADMIN' },
      })
    );
    const result = runGuard({} as any, {} as any);
    expect(result).toBe(true);
  });

  it('cookie missing accessToken: redirects to /login', () => {
    cookieService.get.and.returnValue(
      JSON.stringify({
        data: { role: 'ADMIN' },
      })
    );
    runGuard({} as any, {} as any);
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });

  it('cookie missing role: redirects to /login', () => {
    cookieService.get.and.returnValue(
      JSON.stringify({
        data: { accessToken: 'tok123' },
      })
    );
    runGuard({} as any, {} as any);
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });

  it('malformed JSON cookie: redirects to /login', () => {
    cookieService.get.and.returnValue('not-valid-json{{');
    runGuard({} as any, {} as any);
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });

  it('absent cookie (empty string): redirects to /login', () => {
    cookieService.get.and.returnValue('');
    runGuard({} as any, {} as any);
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });
});
