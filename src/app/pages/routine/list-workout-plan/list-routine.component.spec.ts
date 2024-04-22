import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoutineComponent } from './list-routine.component';

describe('ListRoutineComponent', () => {
  let component: ListRoutineComponent;
  let fixture: ComponentFixture<ListRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRoutineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
