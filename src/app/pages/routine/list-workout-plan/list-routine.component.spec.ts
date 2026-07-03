import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { ListRoutineComponent } from './list-routine.component';
import { AuthService } from '../../../core/service/auth/auth.service';
import { WorkoutPlan } from '../../../core/models/workout-plan.interface';
import { Role } from '../../../core/models/role.enum';
import baseUrl from '../../../core/service/helper';

describe('ListRoutineComponent', () => {
  let component: ListRoutineComponent;
  let fixture: ComponentFixture<ListRoutineComponent>;
  let httpMock: HttpTestingController;

  const plans: WorkoutPlan[] = [
    { id: 1, userId: 10, trainerId: 5, description: 'Plan de fuerza', status: 'ACTIVE', startDate: '2024-01-01', endDate: '2024-06-30', createdAt: '2024-01-01', updatedAt: null, isTemplate: false, dailyRoutine: [] },
    { id: 2, userId: 11, trainerId: 5, description: 'Plan de resistencia', status: 'COMPLETED', startDate: '2024-01-01', endDate: '2024-06-30', createdAt: '2024-01-01', updatedAt: null, isTemplate: true, dailyRoutine: [] },
  ];

  function configure(authServiceStub: Partial<AuthService>): void {
    TestBed.configureTestingModule({
      imports: [ListRoutineComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        DialogService,
        { provide: CookieService, useValue: { get: () => '', set: () => { }, delete: () => { } } },
        { provide: AuthService, useValue: authServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListRoutineComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  }

  afterEach(() => {
    httpMock.verify();
  });

  describe('as ADMIN', () => {
    beforeEach(() => {
      configure({ isTrainer: false, currentUser: { id: 1, role: Role.ADMIN } });
      fixture.detectChanges();

      const req = httpMock.expectOne(`${baseUrl}/api/v1/workout-plans`);
      expect(req.request.method).toBe('GET');
      req.flush({ data: plans });
    });

    it('should create and load all workout plans', () => {
      expect(component).toBeTruthy();
      expect(component.dataSource.length).toBe(2);
    });

    it('deletePlan removes the plan from dataSource on confirm', fakeAsync(() => {
      spyOn(Swal, 'fire').and.resolveTo({ isConfirmed: true } as any);

      component.deletePlan(plans[0]);
      tick();

      const deleteReq = httpMock.expectOne(`${baseUrl}/api/v1/workout-plans/1`);
      expect(deleteReq.request.method).toBe('DELETE');
      deleteReq.flush({ data: null });
      tick();

      expect(component.dataSource.find((p) => p.id === 1)).toBeUndefined();
    }));

    it('editPlan refreshes the list when the dialog closes with a truthy result', () => {
      const onClose = new Subject<any>();
      spyOn(TestBed.inject(DialogService), 'open').and.returnValue({ onClose } as any);

      component.editPlan(plans[0]);
      onClose.next(true);

      const req = httpMock.expectOne(`${baseUrl}/api/v1/workout-plans`);
      expect(req.request.method).toBe('GET');
      req.flush({ data: plans });
    });
  });

  describe('as TRAINER', () => {
    beforeEach(() => {
      configure({ isTrainer: true, currentUser: { id: 5, role: Role.TRAINER } });
      fixture.detectChanges();
    });

    it('scopes the request to findByTrainer with the current trainer id', () => {
      const req = httpMock.expectOne(`${baseUrl}/api/v1/workout-plans/trainer/5`);
      expect(req.request.method).toBe('GET');
      req.flush({ data: plans });

      expect(component.dataSource.length).toBe(2);
    });
  });
});
