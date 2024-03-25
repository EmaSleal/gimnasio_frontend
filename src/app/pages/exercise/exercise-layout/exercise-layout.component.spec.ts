import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseLayoutComponent } from './exercise-layout.component';

describe('ExerciseLayoutComponent', () => {
  let component: ExerciseLayoutComponent;
  let fixture: ComponentFixture<ExerciseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
