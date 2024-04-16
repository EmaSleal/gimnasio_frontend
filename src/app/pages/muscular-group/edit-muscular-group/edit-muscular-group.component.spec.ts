import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMuscularGroupComponent } from './edit-muscular-group.component';

describe('EditMuscularGroupComponent', () => {
  let component: EditMuscularGroupComponent;
  let fixture: ComponentFixture<EditMuscularGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMuscularGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMuscularGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
