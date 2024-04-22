import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkoutPlanComponent } from './add-workout-plan.component';

describe('AddRoutineComponent', () => {
  let component: AddWorkoutPlanComponent;
  let fixture: ComponentFixture<AddWorkoutPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkoutPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWorkoutPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
