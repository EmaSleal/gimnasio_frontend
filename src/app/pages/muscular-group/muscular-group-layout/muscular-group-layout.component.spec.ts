import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscularGroupLayoutComponent } from './muscular-group-layout.component';

describe('MuscularGroupLayoutComponent', () => {
  let component: MuscularGroupLayoutComponent;
  let fixture: ComponentFixture<MuscularGroupLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscularGroupLayoutComponent]
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
