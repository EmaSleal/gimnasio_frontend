import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineMatrixComponent } from './routine-matrix.component';

describe('RoutineMatrixComponent', () => {
  let component: RoutineMatrixComponent;
  let fixture: ComponentFixture<RoutineMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineMatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutineMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
