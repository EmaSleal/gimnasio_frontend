import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { RoutineMatrixComponent } from './routine-matrix.component';

describe('RoutineMatrixComponent', () => {
  let component: RoutineMatrixComponent;
  let fixture: ComponentFixture<RoutineMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineMatrixComponent],
      providers: [provideNoopAnimations(), DialogService],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutineMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
