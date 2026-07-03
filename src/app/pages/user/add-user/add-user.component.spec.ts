import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

import { AddUserComponent } from './add-user.component';
import { Role, roleOptions } from '../../../core/models/role.enum';
import baseUrl from '../../../core/service/helper';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let httpMock: HttpTestingController;

  function fillValidForm(): void {
    component.userForm.setValue({
      username: 'nueva.usuaria',
      password: 'Password1!',
      email: 'nueva@example.com',
      role: Role.TRAINER,
      confirmPassword: 'Password1!',
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserComponent, HttpClientTestingModule],
      providers: [
        { provide: CookieService, useValue: { get: () => '', set: () => {}, delete: () => {} } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
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

  it('does not call addUser and stays not loading when the form is invalid', () => {
    expect(component.userForm.invalid).toBeTrue();
    component.submitForm();
    expect(component.loading).toBeFalse();
    httpMock.expectNone(`${baseUrl}/api/v1/users`);
  });

  it('marks confirmPassword invalid when passwords do not match (unchanged validator)', () => {
    fillValidForm();
    component.userForm.patchValue({ confirmPassword: 'Different1!' });
    expect(component.confirmPassword?.errors?.['passwordMismatch']).toBeTrue();
  });

  it('sets loading=true while submitting a valid form, then false after a successful response', () => {
    fillValidForm();
    component.submitForm();
    expect(component.loading).toBeTrue();

    const req = httpMock.expectOne(`${baseUrl}/api/v1/users`);
    expect(req.request.method).toBe('POST');
    req.flush({ data: { id: 1, username: 'nueva.usuaria', email: 'nueva@example.com', role: Role.TRAINER, enabled: true, createdAt: '' } });

    expect(component.loading).toBeFalse();
  });

  it('sets loading=false after an error response', () => {
    fillValidForm();
    component.submitForm();
    expect(component.loading).toBeTrue();

    const req = httpMock.expectOne(`${baseUrl}/api/v1/users`);
    req.flush('error', { status: 500, statusText: 'Server Error' });

    expect(component.loading).toBeFalse();
  });
});
