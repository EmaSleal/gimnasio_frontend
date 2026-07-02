import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';

import { UserHomeLayoutComponent } from './user-home-layout.component';

const cookieStub = {
  get: () => JSON.stringify({ data: { accessToken: 'tok', refreshToken: 'rtok', userId: 1, role: 'TRAINER' }, message: 'OK', timestamp: '' }),
  set: () => {},
  delete: () => {}
};

describe('UserHomeLayoutComponent', () => {
  let component: UserHomeLayoutComponent;
  let fixture: ComponentFixture<UserHomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeLayoutComponent, HttpClientTestingModule],
      providers: [
        DialogService,
        { provide: CookieService, useValue: cookieStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
