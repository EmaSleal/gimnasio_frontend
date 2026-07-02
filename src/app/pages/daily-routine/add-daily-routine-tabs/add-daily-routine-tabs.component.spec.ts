import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

import { AddDailyRoutineTabsComponent } from './add-daily-routine-tabs.component';

describe('AddDailyRoutineTabsComponent', () => {
  let component: AddDailyRoutineTabsComponent;
  let fixture: ComponentFixture<AddDailyRoutineTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDailyRoutineTabsComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CookieService, useValue: { get: () => '', set: () => {}, delete: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDailyRoutineTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
