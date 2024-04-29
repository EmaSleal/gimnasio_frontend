import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRoutineLayoutComponent } from './daily-routine-layout.component';

describe('DailyRoutineLayoutComponent', () => {
  let component: DailyRoutineLayoutComponent;
  let fixture: ComponentFixture<DailyRoutineLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyRoutineLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyRoutineLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
