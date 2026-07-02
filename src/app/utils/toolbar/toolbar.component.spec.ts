import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar.component';
import { AuthService } from '../../core/service/auth/auth.service';
import { NavbarService } from '../../core/service/navbar/navbar.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    const navbarService = jasmine.createSpyObj('NavbarService', ['toggleNavbar']);

    await TestBed.configureTestingModule({
      imports: [ToolbarComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: NavbarService, useValue: navbarService },
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders p-toolbar and no mat-toolbar', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('p-toolbar')).toBeTruthy();
    expect(el.querySelector('mat-toolbar')).toBeFalsy();
  });

  it('logout() calls authService.logout()', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
