import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';

import { ListExerciseComponent } from './list-exercise.component';

describe('ListExerciseComponent', () => {
  let component: ListExerciseComponent;
  let fixture: ComponentFixture<ListExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExerciseComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        DialogService,
        { provide: CookieService, useValue: { get: () => '', set: () => {}, delete: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
