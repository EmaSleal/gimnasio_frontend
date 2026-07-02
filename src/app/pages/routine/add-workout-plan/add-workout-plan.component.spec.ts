import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

import { AddWorkoutPlanComponent } from './add-workout-plan.component';

const cookieStub = {
  get: () => JSON.stringify({ data: { accessToken: 'tok', refreshToken: 'rtok', userId: 1, role: 'TRAINER' }, message: 'OK', timestamp: '' }),
  set: () => {},
  delete: () => {}
};

describe('AddRoutineComponent', () => {
  let component: AddWorkoutPlanComponent;
  let fixture: ComponentFixture<AddWorkoutPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkoutPlanComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CookieService, useValue: cookieStub }
      ]
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
