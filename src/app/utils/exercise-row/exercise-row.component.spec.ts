import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExerciseRowComponent } from './exercise-row.component';
import { Workout } from '../../core/models/workout.interface';

describe('ExerciseRowComponent', () => {
  let component: ExerciseRowComponent;
  let fixture: ComponentFixture<ExerciseRowComponent>;

  const mockWorkouts: Workout[] = [
    { id: '1', name: 'Push Up', muscularGroup: { id: '1', name: 'Chest' } },
    { id: '2', name: 'Pull Up', muscularGroup: { id: '2', name: 'Back' } }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseRowComponent, NoopAnimationsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ExerciseRowComponent);
    component = fixture.componentInstance;
    component.title = 'Chest Exercises';
    component.workouts = mockWorkouts;
  });

  it('should render the title', () => {
    fixture.detectChanges();
    const titleEl = fixture.debugElement.query(By.css('.row-title'));
    expect(titleEl).toBeTruthy();
    expect(titleEl.nativeElement.textContent).toContain('Chest Exercises');
  });

  it('should render one app-exercise-card per workout', () => {
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('app-exercise-card'));
    expect(cards.length).toBe(2);
  });

  it('should render the scroll container', () => {
    fixture.detectChanges();
    const scrollContainer = fixture.debugElement.query(By.css('.row-scroll'));
    expect(scrollContainer).toBeTruthy();
  });
});
