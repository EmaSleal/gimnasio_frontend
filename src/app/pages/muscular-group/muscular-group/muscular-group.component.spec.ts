import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscularGroupComponent } from './muscular-group.component';

describe('MuscularGroupComponent', () => {
  let component: MuscularGroupComponent;
  let fixture: ComponentFixture<MuscularGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscularGroupComponent]
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
