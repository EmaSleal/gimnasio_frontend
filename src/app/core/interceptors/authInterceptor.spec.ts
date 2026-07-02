import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptorFn } from './authInterceptor';

describe('AuthInterceptorFn', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let navigateByUrlSpy: jasmine.Spy;
  let deleteSpy: jasmine.Spy;
  let getCookieFn: () => string;

  function setup(currentUrl: string) {
    navigateByUrlSpy = jasmine.createSpy('navigateByUrl');
    deleteSpy = jasmine.createSpy('delete');
    getCookieFn = () => '';

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([AuthInterceptorFn])),
        provideHttpClientTesting(),
        {
          provide: Router,
          useValue: { url: currentUrl, navigateByUrl: navigateByUrlSpy },
        },
        {
          provide: CookieService,
          useValue: { get: () => getCookieFn(), delete: deleteSpy, set: () => {} },
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  }

  afterEach(() => {
    controller?.verify();
    TestBed.resetTestingModule();
  });

  describe('Authorization header', () => {
    it('attaches Bearer token from cookie when present', (done) => {
      setup('/exercise');
      const cookie = JSON.stringify({
        data: { accessToken: 'my-jwt-token', refreshToken: 'rtok', userId: 1, role: 'TRAINER' },
        message: 'OK',
        timestamp: '',
      });
      getCookieFn = () => cookie;

      http.get('/api/v1/users').subscribe({ next: () => done() });
      const req = controller.expectOne('/api/v1/users');
      expect(req.request.headers.get('Authorization')).toBe('Bearer my-jwt-token');
      req.flush({});
    });

    it('does not attach Authorization header when cookie is absent', (done) => {
      setup('/exercise');
      getCookieFn = () => '';

      http.get('/api/v1/users').subscribe({ next: () => done() });
      const req = controller.expectOne('/api/v1/users');
      expect(req.request.headers.has('Authorization')).toBeFalse();
      req.flush({});
    });
  });

  describe('Error handling', () => {
    it('(a) 401 on protected route: deletes cookie and navigates to /login', () => {
      setup('/exercise');
      http.get('/api/test').subscribe({ error: () => {} });
      controller
        .expectOne('/api/test')
        .flush(null, { status: 401, statusText: 'Unauthorized' });
      expect(deleteSpy).toHaveBeenCalledWith('user');
      expect(navigateByUrlSpy).toHaveBeenCalledWith('/login');
    });

    it('(b) 401 while on /login: no navigation and no cookie delete', () => {
      setup('/login');
      http.get('/api/test').subscribe({ error: () => {} });
      controller
        .expectOne('/api/test')
        .flush(null, { status: 401, statusText: 'Unauthorized' });
      expect(navigateByUrlSpy).not.toHaveBeenCalled();
      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('(c) 403: navigates to /unauthorized', () => {
      setup('/exercise');
      http.get('/api/test').subscribe({ error: () => {} });
      controller
        .expectOne('/api/test')
        .flush(null, { status: 403, statusText: 'Forbidden' });
      expect(navigateByUrlSpy).toHaveBeenCalledWith('/unauthorized');
    });

    it('(d) 2xx: passes through without error', (done) => {
      setup('/exercise');
      http.get<{ ok: boolean }>('/api/test').subscribe({
        next: (res) => {
          expect(res.ok).toBeTrue();
          done();
        },
        error: () => fail('should not error on 2xx'),
      });
      controller.expectOne('/api/test').flush({ ok: true });
    });
  });
});
