import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';

import { ExerciseLayoutComponent } from './exercise-layout.component';

describe('ExerciseLayoutComponent', () => {
  let component: ExerciseLayoutComponent;
  let fixture: ComponentFixture<ExerciseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseLayoutComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        DialogService,
        { provide: CookieService, useValue: { get: () => '', set: () => {}, delete: () => {} } }
      ]
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
