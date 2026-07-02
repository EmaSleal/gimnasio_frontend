import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthService } from './core/service/auth/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

describe('AppComponent', () => {
  let component: AppComponent;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout', 'getCurrentUserFromCookie']);

    const primengConfigMock = {
      csp: { set: jasmine.createSpy('set') },
      ripple: false,
      zIndex: {},
      filterMatchModeOptions: {},
      setTranslation: jasmine.createSpy('setTranslation'),
    };

    const cookieSpy = jasmine.createSpyObj('CookieService', ['set', 'get', 'delete', 'check']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: PrimeNGConfig, useValue: primengConfigMock },
        { provide: CookieService, useValue: cookieSpy },
        provideNoopAnimations(),
      ],
    })
    .overrideComponent(AppComponent, {
      set: {
        template: '<div></div>',
        imports: [],
        animations: [],
      },
    })
    .compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logout() delegates to authService.logout()', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
