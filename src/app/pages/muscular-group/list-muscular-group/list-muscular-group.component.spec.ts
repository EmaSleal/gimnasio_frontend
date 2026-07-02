import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from 'primeng/dynamicdialog';

import { ListMuscularGroupComponent } from './list-muscular-group.component';

describe('ListMuscularGroupComponent', () => {
  let component: ListMuscularGroupComponent;
  let fixture: ComponentFixture<ListMuscularGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMuscularGroupComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        DialogService
      ]
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
