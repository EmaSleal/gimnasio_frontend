import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WorkoutDialogComponent } from './workout-dialog.component';

describe('WorkoutDialogComponent', () => {
  let component: WorkoutDialogComponent;
  let fixture: ComponentFixture<WorkoutDialogComponent>;

  const mockWorkoutSpec = {
    id: '1',
    description: 'Test workout',
    setsNumber: 3,
    repsNumber: 10,
    recommendedWeight: 50,
    trainerRating: 5,
    timeBased: false,
    time: 0,
    workout: { name: 'Push Up', muscularGroup: {} },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: DynamicDialogConfig, useValue: { data: mockWorkoutSpec } },
        { provide: DynamicDialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
