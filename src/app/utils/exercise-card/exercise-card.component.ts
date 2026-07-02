import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { Workout } from '../../core/models/workout.interface';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [NgIf, CardModule, ProgressBarModule],
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseCardComponent {
  @Input() workout!: Workout;
  @Input() showProgress = false;
  @Input() progress = 0;
  @Input() badge?: string;
}
