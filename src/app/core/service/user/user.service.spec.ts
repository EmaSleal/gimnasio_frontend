import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { User } from '../../models/user.interface';
import { ApiResponse } from '../../models/api-response.interface';
import { Role } from '../../models/role.enum';

const BASE = 'http://localhost:8080';

const mockUser: User = {
  id: 1,
  username: 'jdoe',
  email: 'jdoe@example.com',
  role: Role.TRAINER,
  enabled: true,
  createdAt: '2024-01-01'
};

function wrap<T>(data: T): ApiResponse<T> {
  return { data, message: 'OK', timestamp: '2024-01-01T00:00:00Z' };
}

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    cookieService = jasmine.createSpyObj('CookieService', ['get', 'set', 'delete']);
    cookieService.get.and.returnValue(
      JSON.stringify({ data: { accessToken: 'tok', refreshToken: 'rtok', userId: 42, role: 'TRAINER' }, message: 'OK', timestamp: '' })
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        UserService,
        { provide: CookieService, useValue: cookieService }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers() should GET /api/v1/users and return unwrapped User[]', (done) => {
    service.getUsers().subscribe({
      next: (users) => {
        expect(users).toEqual([mockUser]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/users`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockUser]));
  });

  it('getUser(id) should GET /api/v1/users/{id} and return unwrapped User', (done) => {
    service.getUser(1).subscribe({
      next: (user) => {
        expect(user).toEqual(mockUser);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap(mockUser));
  });

  it('updateUser(id, dto) should PUT /api/v1/users/{id} with id in path and not in body', (done) => {
    const dto = { username: 'updated', email: 'updated@example.com', role: Role.TRAINER, enabled: true };

    service.updateUser(1, dto).subscribe({
      next: (user) => {
        expect(user).toEqual(mockUser);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/users/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.url).toContain('/1');
    expect(req.request.body['id']).toBeUndefined();
    req.flush(wrap(mockUser));
  });

  it('deleteUser(id) should DELETE /api/v1/users/{id}', (done) => {
    service.deleteUser(1).subscribe({ next: () => done() });

    const req = httpMock.expectOne(`${BASE}/api/v1/users/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('addUser(dto) should POST /api/v1/users and return unwrapped User', (done) => {
    const dto = { username: 'new', email: 'new@test.com', role: Role.CLIENT };

    service.addUser(dto).subscribe({
      next: (user) => {
        expect(user).toEqual(mockUser);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/users`);
    expect(req.request.method).toBe('POST');
    req.flush(wrap(mockUser));
  });

  it('getUsersCreatedBy() should GET /api/v1/users/trainer/{id}/clients with cookie userId', (done) => {
    service.getUsersCreatedBy().subscribe({
      next: (users) => {
        expect(users).toEqual([mockUser]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/users/trainer/42/clients`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockUser]));
  });

  it('getUserByCookie() should GET /api/v1/users/{id} with cookie userId', (done) => {
    service.getUserByCookie().subscribe({
      next: (user) => {
        expect(user).toEqual(mockUser);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/users/42`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap(mockUser));
  });

  it('getUserRoleFromCookie() should return true when user cookie is present', () => {
    // beforeEach sets a non-empty cookie value
    expect(service.getUserRoleFromCookie()).toBeTrue();
  });

  it('getUserRoleFromCookie() should return false when user cookie is absent', () => {
    cookieService.get.and.returnValue('');
    expect(service.getUserRoleFromCookie()).toBeFalse();
  });
});
