import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RoutineLayoutComponent } from './routine-layout.component';

describe('RoutineLayoutComponent', () => {
  let component: RoutineLayoutComponent;
  let fixture: ComponentFixture<RoutineLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineLayoutComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
