import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditUserComponent } from './edit-user.component';
import { Role, roleOptions } from '../../../core/models/role.enum';
import baseUrl from '../../../core/service/helper';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let httpMock: HttpTestingController;
  let closeSpy: jasmine.Spy;

  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@test.com',
    role: Role.ADMIN,
    enabled: true,
    createdAt: '',
  };

  beforeEach(async () => {
    closeSpy = jasmine.createSpy('close');
    await TestBed.configureTestingModule({
      imports: [EditUserComponent, HttpClientTestingModule],
      providers: [
        provideNoopAnimations(),
        { provide: CookieService, useValue: { get: () => '', set: () => {}, delete: () => {} } },
        { provide: DynamicDialogConfig, useValue: { data: { user: mockUser } } },
        { provide: DynamicDialogRef, useValue: { close: closeSpy } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('derives roleOptions from the Role enum instead of a hardcoded array', () => {
    expect(component.roleOptions).toEqual(roleOptions);
    expect(component.roleOptions.map((o) => o.value)).toEqual([Role.ADMIN, Role.TRAINER, Role.CLIENT]);
  });

  it('cerrarModal() closes the dialog without saving', () => {
    component.cerrarModal();
    expect(closeSpy).toHaveBeenCalledWith();
  });

  it('sets loading=true while submitting a valid form, then false after success, and closes the dialog with true', () => {
    component.submitForm();
    expect(component.loading).toBeTrue();

    const req = httpMock.expectOne(`${baseUrl}/api/v1/users/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ data: { ...mockUser, username: 'testuser' } });

    expect(component.loading).toBeFalse();
    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('sets loading=false after an error response and does not close the dialog', () => {
    component.submitForm();
    expect(component.loading).toBeTrue();

    const req = httpMock.expectOne(`${baseUrl}/api/v1/users/1`);
    req.flush('error', { status: 500, statusText: 'Server Error' });

    expect(component.loading).toBeFalse();
    expect(closeSpy).not.toHaveBeenCalled();
  });
});
