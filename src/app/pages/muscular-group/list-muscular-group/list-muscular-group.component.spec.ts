import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMuscularGroupComponent } from './list-muscular-group.component';

describe('ListMuscularGroupComponent', () => {
  let component: ListMuscularGroupComponent;
  let fixture: ComponentFixture<ListMuscularGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMuscularGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMuscularGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
