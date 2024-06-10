import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeLayoutComponent } from './user-home-layout.component';

describe('UserHomeLayoutComponent', () => {
  let component: UserHomeLayoutComponent;
  let fixture: ComponentFixture<UserHomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeLayoutComponent]
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
