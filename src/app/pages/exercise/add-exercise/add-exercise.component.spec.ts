import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddExerciseComponent } from './add-exercise.component';

describe('AddExerciseComponent', () => {
  let component: AddExerciseComponent;
  let fixture: ComponentFixture<AddExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExerciseComponent],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        { provide: DynamicDialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
