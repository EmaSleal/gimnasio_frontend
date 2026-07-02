import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';

import { UserLayoutComponent } from './user-layout.component';

describe('UserLayoutComponent', () => {
  let component: UserLayoutComponent;
  let fixture: ComponentFixture<UserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLayoutComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        DialogService,
        { provide: CookieService, useValue: { get: () => '', set: () => {}, delete: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
