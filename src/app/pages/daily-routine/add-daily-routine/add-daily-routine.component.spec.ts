import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyRoutineComponent } from './add-daily-routine.component';

describe('AddDailyRoutineComponent', () => {
  let component: AddDailyRoutineComponent;
  let fixture: ComponentFixture<AddDailyRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDailyRoutineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDailyRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
