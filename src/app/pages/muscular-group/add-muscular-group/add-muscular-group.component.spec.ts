import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMuscularGroupComponent } from './add-muscular-group.component';

describe('AddMuscularGroupComponent', () => {
  let component: AddMuscularGroupComponent;
  let fixture: ComponentFixture<AddMuscularGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMuscularGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMuscularGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
