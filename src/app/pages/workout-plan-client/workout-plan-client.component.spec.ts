import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { WorkoutPlanClientComponent } from './workout-plan-client.component';
import { WorkoutPlanService } from '../../core/service/workout-plan/workout-plan.service';
import { WorkoutPlan } from '../../core/models/workout-plan.interface';
import { Workout } from '../../core/models/workout.interface';

const mockWorkout: Workout = {
  id: '1',
  name: 'Press de Banca',
  muscularGroup: { id: '1', name: 'Pecho' }
};

const mockWorkoutPlan: WorkoutPlan = {
  id: 1,
  userId: 1,
  trainerId: 1,
  description: 'Plan de prueba',
  status: 'ACTIVE',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  createdAt: '2024-01-01',
  updatedAt: null,
  isTemplate: false,
  dailyRoutine: [
    {
      id: 1,
      days: ['Monday'],
      workoutSpecification: [
        {
          id: 1,
          description: 'Ejercicio de pecho',
          repsNumber: 10,
          setsNumber: 3,
          recommendedWeight: 50,
          trainerRating: 5,
          workout: mockWorkout,
          timeBased: false,
          time: 0
        }
      ]
    }
  ]
};

describe('WorkoutPlanClientComponent', () => {
  let component: WorkoutPlanClientComponent;
  let fixture: ComponentFixture<WorkoutPlanClientComponent>;
  let workoutPlanServiceSpy: jasmine.SpyObj<WorkoutPlanService>;

  beforeEach(async () => {
    workoutPlanServiceSpy = jasmine.createSpyObj('WorkoutPlanService', ['getWorkoutPlanById']);

    await TestBed.configureTestingModule({
      imports: [WorkoutPlanClientComponent, NoopAnimationsModule, HttpClientTestingModule],
      providers: [
        { provide: WorkoutPlanService, useValue: workoutPlanServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutPlanClientComponent);
    component = fixture.componentInstance;
    // Do NOT call detectChanges here — each test configures the spy first
  });

  it('should create', () => {
    workoutPlanServiceSpy.getWorkoutPlanById.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should always render app-hero-banner regardless of workout data', () => {
    workoutPlanServiceSpy.getWorkoutPlanById.and.returnValue(of([mockWorkoutPlan]));
    fixture.detectChanges();
    const banner = fixture.debugElement.query(By.css('app-hero-banner'));
    expect(banner).toBeTruthy();
  });

  it('should render app-filter-bar when workouts exist', () => {
    workoutPlanServiceSpy.getWorkoutPlanById.and.returnValue(of([mockWorkoutPlan]));
    fixture.detectChanges();
    const filterBar = fixture.debugElement.query(By.css('app-filter-bar'));
    expect(filterBar).toBeTruthy();
  });

  it('should render at least one app-exercise-row when workouts exist', () => {
    workoutPlanServiceSpy.getWorkoutPlanById.and.returnValue(of([mockWorkoutPlan]));
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('app-exercise-row'));
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should render app-empty-state when service returns empty plans', () => {
    workoutPlanServiceSpy.getWorkoutPlanById.and.returnValue(of([]));
    fixture.detectChanges();
    const emptyState = fixture.debugElement.query(By.css('app-empty-state'));
    expect(emptyState).toBeTruthy();
  });

  it('should NOT render app-empty-state when workouts exist', () => {
    workoutPlanServiceSpy.getWorkoutPlanById.and.returnValue(of([mockWorkoutPlan]));
    fixture.detectChanges();
    const emptyState = fixture.debugElement.query(By.css('app-empty-state'));
    expect(emptyState).toBeNull();
  });

  it('should update activeFilter when onFilterChange is called', () => {
    workoutPlanServiceSpy.getWorkoutPlanById.and.returnValue(of([mockWorkoutPlan]));
    fixture.detectChanges();
    component.onFilterChange('Pecho');
    expect(component.activeFilter).toBe('Pecho');
  });

  it('should populate filters with Todos plus unique muscle group names', () => {
    workoutPlanServiceSpy.getWorkoutPlanById.and.returnValue(of([mockWorkoutPlan]));
    fixture.detectChanges();
    expect(component.filters).toContain('Todos');
    expect(component.filters).toContain('Pecho');
  });
});
