import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutService } from './workout.service';
import { Workout } from '../../models/workout.interface';
import { ApiResponse } from '../../models/api-response.interface';

const BASE = 'http://localhost:8080';

const mockWorkout: Workout = {
  id: '1',
  name: 'Bench Press',
  muscularGroup: { id: '2', name: 'Chest' }
};

function wrap<T>(data: T): ApiResponse<T> {
  return { data, message: 'OK', timestamp: '2024-01-01T00:00:00Z' };
}

describe('WorkoutService', () => {
  let service: WorkoutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkoutService]
    });

    service = TestBed.inject(WorkoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getWorkouts() should GET /api/v1/workouts and return unwrapped list', (done) => {
    service.getWorkouts().subscribe({
      next: (workouts) => {
        expect(workouts).toEqual([mockWorkout]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workouts`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockWorkout]));
  });

  it('getWorkout(id) should GET /api/v1/workouts/{id} and return unwrapped item', (done) => {
    service.getWorkout('1').subscribe({
      next: (workout) => {
        expect(workout).toEqual(mockWorkout);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workouts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap(mockWorkout));
  });

  it('saveWorkout(dto) should POST /api/v1/workouts and return unwrapped item', (done) => {
    service.saveWorkout(mockWorkout).subscribe({
      next: (workout) => {
        expect(workout).toEqual(mockWorkout);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workouts`);
    expect(req.request.method).toBe('POST');
    req.flush(wrap(mockWorkout));
  });

  it('updateWorkout(id, dto) should PUT /api/v1/workouts/{id}', (done) => {
    const dto = { name: 'Updated Bench Press' };

    service.updateWorkout('1', dto).subscribe({
      next: (workout) => {
        expect(workout).toEqual(mockWorkout);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workouts/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(wrap(mockWorkout));
  });

  it('deleteWorkout(id) should DELETE /api/v1/workouts/{id}', (done) => {
    service.deleteWorkout('1').subscribe({ next: () => done() });

    const req = httpMock.expectOne(`${BASE}/api/v1/workouts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('getWorkoutsByMuscularGroup(id) should GET /api/v1/workouts/muscular-group/{id}', (done) => {
    service.getWorkoutsByMuscularGroup('2').subscribe({
      next: (workouts) => {
        expect(workouts).toEqual([mockWorkout]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/workouts/muscular-group/2`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockWorkout]));
  });
});
