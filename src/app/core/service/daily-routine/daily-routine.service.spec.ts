import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DailyRoutineService } from './daily-routine.service';
import { DailyRoutine } from '../../models/daily-routine.interface';
import { ApiResponse } from '../../models/api-response.interface';

const BASE = 'http://localhost:8080';

const mockRoutine: DailyRoutine = {
  id: 5,
  days: ['MONDAY', 'WEDNESDAY'],
  workoutSpecification: []
};

function wrap<T>(data: T): ApiResponse<T> {
  return { data, message: 'OK', timestamp: '2024-01-01T00:00:00Z' };
}

describe('DailyRoutineService', () => {
  let service: DailyRoutineService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DailyRoutineService]
    });

    service = TestBed.inject(DailyRoutineService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findById(id) should GET /api/v1/daily-routines/{id} and return unwrapped routine', (done) => {
    service.findById(5).subscribe({
      next: (routine) => {
        expect(routine).toEqual(mockRoutine);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/daily-routines/5`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap(mockRoutine));
  });

  it('findByWorkoutPlan(id) should GET /api/v1/daily-routines/plan/{id} and return unwrapped list', (done) => {
    service.findByWorkoutPlan(10).subscribe({
      next: (routines) => {
        expect(routines).toEqual([mockRoutine]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/daily-routines/plan/10`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockRoutine]));
  });

  it('create(dto) should POST /api/v1/daily-routines and return unwrapped routine', (done) => {
    const dto = { days: ['TUESDAY'], workoutSpecification: [] };

    service.create(dto).subscribe({
      next: (routine) => {
        expect(routine).toEqual(mockRoutine);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/daily-routines`);
    expect(req.request.method).toBe('POST');
    req.flush(wrap(mockRoutine));
  });

  it('update(id, dto) should PUT /api/v1/daily-routines/{id} and return unwrapped routine', (done) => {
    const dto = { days: ['FRIDAY'] };

    service.update(5, dto).subscribe({
      next: (routine) => {
        expect(routine).toEqual(mockRoutine);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/daily-routines/5`);
    expect(req.request.method).toBe('PUT');
    req.flush(wrap(mockRoutine));
  });

  it('delete(id) should DELETE /api/v1/daily-routines/{id}', (done) => {
    service.delete(5).subscribe({ next: () => done() });

    const req = httpMock.expectOne(`${BASE}/api/v1/daily-routines/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should propagate HTTP 404 error without swallowing it', (done) => {
    service.findById(999).subscribe({
      next: () => fail('Expected error'),
      error: (err) => {
        expect(err.status).toBe(404);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/daily-routines/999`);
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
