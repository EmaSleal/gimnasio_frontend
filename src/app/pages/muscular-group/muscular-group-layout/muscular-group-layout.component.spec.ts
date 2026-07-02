import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from 'primeng/dynamicdialog';

import { MuscularGroupLayoutComponent } from './muscular-group-layout.component';

describe('MuscularGroupLayoutComponent', () => {
  let component: MuscularGroupLayoutComponent;
  let fixture: ComponentFixture<MuscularGroupLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscularGroupLayoutComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        DialogService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuscularGroupLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
