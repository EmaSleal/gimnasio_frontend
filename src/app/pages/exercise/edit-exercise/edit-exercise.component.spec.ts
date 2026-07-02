import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditExerciseComponent } from './edit-exercise.component';

describe('EditExerciseComponent', () => {
  let component: EditExerciseComponent;
  let fixture: ComponentFixture<EditExerciseComponent>;

  const mockWorkout = {
    id: '1',
    name: 'Push Up',
    muscularLoad: 'LOW',
    muscularGroup: { id: '1', name: 'Chest' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExerciseComponent],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        { provide: DynamicDialogConfig, useValue: { data: { workout: mockWorkout } } },
        { provide: DynamicDialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
