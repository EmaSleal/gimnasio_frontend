import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExerciseCardComponent } from './exercise-card.component';
import { Workout } from '../../core/models/workout.interface';

describe('ExerciseCardComponent', () => {
  let component: ExerciseCardComponent;
  let fixture: ComponentFixture<ExerciseCardComponent>;

  const mockWorkout: Workout = {
    id: '1',
    name: 'Push Up',
    muscularGroup: { id: '1', name: 'Chest' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseCardComponent, NoopAnimationsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ExerciseCardComponent);
    component = fixture.componentInstance;
    component.workout = mockWorkout;
  });

  it('should render workout name', () => {
    fixture.detectChanges();
    const nameEl = fixture.debugElement.query(By.css('.exercise-name'));
    expect(nameEl).toBeTruthy();
    expect(nameEl.nativeElement.textContent).toContain('Push Up');
  });

  it('should render badge when badge input is provided', () => {
    component.badge = 'New';
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.exercise-badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain('New');
  });

  it('should NOT render badge when badge is not provided', () => {
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.exercise-badge'));
    expect(badge).toBeNull();
  });

  it('should render p-progressBar when showProgress is true', () => {
    component.showProgress = true;
    component.progress = 50;
    fixture.detectChanges();
    const progressBar = fixture.debugElement.query(By.css('p-progressbar'));
    expect(progressBar).toBeTruthy();
  });

  it('should NOT render p-progressBar when showProgress is false', () => {
    component.showProgress = false;
    fixture.detectChanges();
    const progressBar = fixture.debugElement.query(By.css('p-progressbar'));
    expect(progressBar).toBeNull();
  });

  it('should bind progress value to progressBar component', () => {
    component.showProgress = true;
    component.progress = 75;
    fixture.detectChanges();
    expect(component.progress).toBe(75);
  });
});
