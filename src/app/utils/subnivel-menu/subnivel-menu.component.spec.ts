import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SubnivelMenuComponent } from './subnivel-menu.component';

describe('SubnivelMenuComponent', () => {
  let component: SubnivelMenuComponent;
  let fixture: ComponentFixture<SubnivelMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SubnivelMenuComponent, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubnivelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
