import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';

import { HomeComponent } from './home.component';

const cookieStub = {
  get: () => JSON.stringify({ data: { accessToken: 'tok', refreshToken: 'rtok', userId: 1, role: 'TRAINER' }, message: 'OK', timestamp: '' }),
  set: () => {},
  delete: () => {}
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HomeComponent, HttpClientTestingModule ],
      providers: [
        DialogService,
        { provide: CookieService, useValue: cookieStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
