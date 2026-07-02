import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseCardComponent } from '../exercise-card/exercise-card.component';
import { Workout } from '../../core/models/workout.interface';

@Component({
  selector: 'app-exercise-row',
  standalone: true,
  imports: [CommonModule, ExerciseCardComponent],
  templateUrl: './exercise-row.component.html',
  styleUrls: ['./exercise-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseRowComponent {
  @Input() title: string = '';
  @Input() workouts: Workout[] = [];
}
