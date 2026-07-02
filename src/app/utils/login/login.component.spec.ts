import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockResponse = {
    data: { accessToken: 'tok', refreshToken: 'rtok', userId: 1, role: 'ADMIN' },
    message: 'OK',
    timestamp: '',
  };

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls authService.login() with payload on form submit', () => {
    authService.login.and.returnValue(of(mockResponse));
    component.loginForm.setValue({ userName: 'testuser', password: 'pass123' });
    component.onSubmit();
    expect(authService.login).toHaveBeenCalled();
  });

  it('navigates to /exercise on successful login', () => {
    authService.login.and.returnValue(of(mockResponse));
    component.loginForm.setValue({ userName: 'testuser', password: 'pass123' });
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/exercise']);
  });

  it('shows Swal error alert on login failure', () => {
    authService.login.and.returnValue(throwError(() => new Error('Unauthorized')));
    const swalSpy = spyOn(Swal, 'fire').and.resolveTo({} as any);
    component.loginForm.setValue({ userName: 'testuser', password: 'pass123' });
    component.onSubmit();
    expect(swalSpy).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'error' }));
  });
});
