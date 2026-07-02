import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { Role } from '../../models/role.enum';
import { SessionUser } from '../../models/session-user.interface';
import baseUrl from '../helper';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let cookieService: jasmine.SpyObj<CookieService>;
  let router: jasmine.SpyObj<Router>;

  const mockResponse = {
    data: { accessToken: 'tok', refreshToken: 'rtok', userId: 1, role: 'ADMIN' },
    message: 'OK',
    timestamp: '',
  };

  beforeEach(() => {
    cookieService = jasmine.createSpyObj('CookieService', ['set', 'delete', 'get', 'check']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CookieService, useValue: cookieService },
        { provide: Router, useValue: router },
      ],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(a) login() emits the server response', (done) => {
    service.login({ email: 'user@test.com', password: 'pass' }).subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);
        done();
      },
    });

    httpController.expectOne(`${baseUrl}/api/v1/auth/login`).flush(mockResponse);
  });

  it('(b) login() sets the user cookie via tap with JSON.stringify(res)', (done) => {
    service.login({ email: 'user@test.com', password: 'pass' }).subscribe({
      next: () => {
        expect(cookieService.set).toHaveBeenCalledWith('user', JSON.stringify(mockResponse));
        done();
      },
    });

    httpController.expectOne(`${baseUrl}/api/v1/auth/login`).flush(mockResponse);
  });

  it('(c) login() does NOT call router.navigate or navigateByUrl', (done) => {
    service.login({ email: 'user@test.com', password: 'pass' }).subscribe({
      next: () => {
        expect(router.navigate).not.toHaveBeenCalled();
        expect(router.navigateByUrl).not.toHaveBeenCalled();
        done();
      },
    });

    httpController.expectOne(`${baseUrl}/api/v1/auth/login`).flush(mockResponse);
  });

  it('(d) login() updates currentUser$ with the authenticated SessionUser', (done) => {
    service.login({ email: 'user@test.com', password: 'pass' }).subscribe({
      next: () => {
        expect(service.currentUser).toEqual({ id: 1, role: Role.ADMIN });
        done();
      },
    });

    httpController.expectOne(`${baseUrl}/api/v1/auth/login`).flush(mockResponse);
  });

  it('isAuthenticated is true after login tap', (done) => {
    service.login({ email: 'user@test.com', password: 'pass' }).subscribe({
      next: () => {
        expect(service.isAuthenticated).toBeTrue();
        done();
      },
    });

    httpController.expectOne(`${baseUrl}/api/v1/auth/login`).flush(mockResponse);
  });

  it('(e) logout() deletes the user cookie', () => {
    service.logout();
    expect(cookieService.delete).toHaveBeenCalledWith('user');
  });

  it('(f) logout() emits null on currentUser$', () => {
    // Seed a non-null session first so the emission is meaningful
    cookieService.get.and.returnValue(JSON.stringify(mockResponse));
    service.getCurrentUserFromCookie();

    const emissions: (SessionUser | null)[] = [];
    service.currentUser$.subscribe(u => emissions.push(u));
    service.logout();

    expect(emissions[emissions.length - 1]).toBeNull();
  });

  it('(g) logout() navigates to /login', () => {
    service.logout();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('(h) logout() is idempotent — calling twice does not throw', () => {
    expect(() => {
      service.logout();
      service.logout();
    }).not.toThrow();
  });

  it('(i) getCurrentUserFromCookie() maps {userId, role} to SessionUser', () => {
    cookieService.get.and.returnValue(JSON.stringify(mockResponse));

    const result = service.getCurrentUserFromCookie();

    expect(result).toEqual({ id: 1, role: Role.ADMIN });
  });

  it('(j) getCurrentUserFromCookie() returns null when cookie is absent', () => {
    cookieService.get.and.returnValue('');

    const result = service.getCurrentUserFromCookie();

    expect(result).toBeNull();
  });

  it('(j2) getCurrentUserFromCookie() returns null when cookie is malformed JSON', () => {
    cookieService.get.and.returnValue('not-valid-json{{');

    const result = service.getCurrentUserFromCookie();

    expect(result).toBeNull();
  });

  it('(k) isAdmin is true when role is ADMIN', () => {
    cookieService.get.and.returnValue(JSON.stringify(mockResponse));
    service.getCurrentUserFromCookie();
    expect(service.isAdmin).toBeTrue();
  });

  it('(k2) isTrainer is true when role is TRAINER', () => {
    const trainerResponse = {
      ...mockResponse,
      data: { ...mockResponse.data, role: 'TRAINER' },
    };
    cookieService.get.and.returnValue(JSON.stringify(trainerResponse));
    service.getCurrentUserFromCookie();
    expect(service.isTrainer).toBeTrue();
  });

  it('(k3) isClient is true when role is CLIENT', () => {
    const clientResponse = {
      ...mockResponse,
      data: { ...mockResponse.data, role: 'CLIENT' },
    };
    cookieService.get.and.returnValue(JSON.stringify(clientResponse));
    service.getCurrentUserFromCookie();
    expect(service.isClient).toBeTrue();
  });
});
