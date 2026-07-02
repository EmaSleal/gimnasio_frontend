import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutPlanService } from '../../core/service/workout-plan/workout-plan.service';
import { Workout } from '../../core/models/workout.interface';
import { HeroBannerComponent } from '../../utils/hero-banner/hero-banner.component';
import { FilterBarComponent } from '../../utils/filter-bar/filter-bar.component';
import { ExerciseRowComponent } from '../../utils/exercise-row/exercise-row.component';
import { EmptyStateComponent } from '../../utils/empty-state/empty-state.component';

@Component({
  selector: 'app-workout-plan-client',
  standalone: true,
  imports: [
    CommonModule,
    HeroBannerComponent,
    FilterBarComponent,
    ExerciseRowComponent,
    EmptyStateComponent
  ],
  templateUrl: './workout-plan-client.component.html',
  styleUrls: ['./workout-plan-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutPlanClientComponent implements OnInit {
  workouts: Workout[] = [];
  filters: string[] = ['Todos'];
  activeFilter = 'Todos';

  constructor(
    private workoutPlanService: WorkoutPlanService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.workoutPlanService.getWorkoutPlanById().subscribe(plans => {
      this.workouts = plans.flatMap(p =>
        p.dailyRoutine?.flatMap(dr =>
          dr.workoutSpecification?.map(ws => ws.workout).filter(Boolean) ?? []
        ) ?? []
      );
      this.filters = [
        'Todos',
        ...new Set(
          this.workouts.map(w => w.muscularGroup?.name).filter(Boolean) as string[]
        )
      ];
      this.cdr.markForCheck();
    });
  }

  onFilterChange(filter: string): void {
    this.activeFilter = filter;
  }

  get activeGroups(): string[] {
    if (this.activeFilter === 'Todos') {
      return [
        ...new Set(
          this.workouts.map(w => w.muscularGroup?.name).filter(Boolean) as string[]
        )
      ];
    }
    return [this.activeFilter];
  }

  getWorkoutsForGroup(group: string): Workout[] {
    return this.workouts.filter(w => w.muscularGroup?.name === group);
  }
}
