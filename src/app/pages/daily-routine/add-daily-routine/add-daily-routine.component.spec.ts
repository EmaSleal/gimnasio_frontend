import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

import { AddDailyRoutineComponent } from './add-daily-routine.component';

describe('AddDailyRoutineComponent', () => {
  let component: AddDailyRoutineComponent;
  let fixture: ComponentFixture<AddDailyRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDailyRoutineComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CookieService, useValue: { get: () => '', set: () => {}, delete: () => {} } }
      ]
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
