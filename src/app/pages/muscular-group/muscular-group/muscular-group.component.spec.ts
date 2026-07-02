import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MuscularGroupComponent } from './muscular-group.component';

describe('MuscularGroupComponent', () => {
  let component: MuscularGroupComponent;
  let fixture: ComponentFixture<MuscularGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscularGroupComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuscularGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
