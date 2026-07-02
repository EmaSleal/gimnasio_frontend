import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { WorkoutPlanService } from './workout-plan.service';
import { WorkoutPlan } from '../../models/workout-plan.interface';
import { ApiResponse } from '../../models/api-response.interface';

const BASE = 'http://localhost:8080';

const mockPlan: WorkoutPlan = {
  id: 10,
  idUser: 1,
  idTrainer: 2,
  description: 'Strength plan',
  status: 'ACTIVE',
  startDate: '2024-01-01',
  endDate: '2024-06-30',
  createdAt: '2024-01-01',
  updatedAt: null,
  isTemplate: false,
  dailyRoutine: []
};

function wrap<T>(data: T): ApiResponse<T> {
  return { data, message: 'OK', timestamp: '2024-01-01T00:00:00Z' };
}

describe('WorkoutPlanService', () => {
  let service: WorkoutPlanService;
  let httpMock: HttpTestingController;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    cookieService = jasmine.createSpyObj('CookieService', ['get', 'set', 'delete']);
    cookieService.get.and.returnValue(
      JSON.stringify({ data: { accessToken: 'tok', refreshToken: 'rtok', userId: 7, role: 'TRAINER' }, message: 'OK', timestamp: '' })
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WorkoutPlanService,
        { provide: CookieService, useValue: cookieService }
      ]
    });

    service = TestBed.inject(WorkoutPlanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getWorkoutPlans() should GET /api/v1/workout-plans and return unwrapped list', (done) => {
    service.getWorkoutPlans().subscribe({
      next: (plans) => {
        expect(plans).toEqual([mockPlan]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workout-plans`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockPlan]));
  });

  it('getWorkoutPlanById() should GET /api/v1/workout-plans/user/{userId} using cookie', (done) => {
    service.getWorkoutPlanById().subscribe({
      next: (plans) => {
        expect(plans).toEqual([mockPlan]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workout-plans/user/7`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockPlan]));
  });

  it('getTemplates() should GET /api/v1/workout-plans/templates', (done) => {
    service.getTemplates().subscribe({
      next: (plans) => {
        expect(plans).toEqual([mockPlan]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workout-plans/templates`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockPlan]));
  });

  it('findById(id) should GET /api/v1/workout-plans/{id}', (done) => {
    service.findById(10).subscribe({
      next: (plan) => {
        expect(plan).toEqual(mockPlan);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workout-plans/10`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap(mockPlan));
  });

  it('findByTrainer(id) should GET /api/v1/workout-plans/trainer/{id}', (done) => {
    service.findByTrainer(2).subscribe({
      next: (plans) => {
        expect(plans).toEqual([mockPlan]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workout-plans/trainer/2`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockPlan]));
  });

  it('saveWorkoutPlan(dto) should POST /api/v1/workout-plans', (done) => {
    const dto = { description: 'New plan', isTemplate: false };

    service.saveWorkoutPlan(dto).subscribe({
      next: (plan) => {
        expect(plan).toEqual(mockPlan);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workout-plans`);
    expect(req.request.method).toBe('POST');
    req.flush(wrap(mockPlan));
  });

  it('updateWorkoutPlan(id, dto) should PUT /api/v1/workout-plans/{id}', (done) => {
    const dto = { description: 'Updated plan' };

    service.updateWorkoutPlan(10, dto).subscribe({
      next: (plan) => {
        expect(plan).toEqual(mockPlan);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workout-plans/10`);
    expect(req.request.method).toBe('PUT');
    req.flush(wrap(mockPlan));
  });

  it('deleteWorkoutPlan(id) should DELETE /api/v1/workout-plans/{id}', (done) => {
    service.deleteWorkoutPlan(10).subscribe({ next: () => done() });

    const req = httpMock.expectOne(`${BASE}/api/v1/workout-plans/10`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
