import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WorkoutPlanService } from '../../../core/service/workout-plan/workout-plan.service';
import { WorkoutPlan } from '../../../core/models/workout-plan.interface';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.scss'
})
export class RoutineComponent implements OnInit {
  workoutPlan: WorkoutPlan | undefined;

  constructor(
    private route: ActivatedRoute,
    private workoutPlanService: WorkoutPlanService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workoutPlanService.findById(id).subscribe({
      next: (workoutPlan) => {
        this.workoutPlan = workoutPlan;
        console.log(this.workoutPlan);
      }
    });
  }
}
