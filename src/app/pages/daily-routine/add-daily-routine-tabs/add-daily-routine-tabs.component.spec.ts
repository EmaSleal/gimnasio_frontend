import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyRoutineTabsComponent } from './add-daily-routine-tabs.component';

describe('AddDailyRoutineTabsComponent', () => {
  let component: AddDailyRoutineTabsComponent;
  let fixture: ComponentFixture<AddDailyRoutineTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDailyRoutineTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDailyRoutineTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
