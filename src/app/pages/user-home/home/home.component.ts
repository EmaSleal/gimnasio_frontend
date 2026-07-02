import { Component, OnInit } from '@angular/core';
import { RoutineMatrixComponent } from '../../routine/routine-matrix/routine-matrix.component';
import { WorkoutPlanService } from '../../../core/service/workout-plan/workout-plan.service';
import { WorkoutPlan } from '../../../core/models/workout-plan.interface';
import { DayOfWeek } from '../../../core/models/day-of-week.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RoutineMatrixComponent]
})
export class HomeComponent implements OnInit{
  constructor(private workoutPlanService: WorkoutPlanService) { }
  routines: WorkoutPlan[]= [];
  

  ngOnInit(): void {
    this.workoutPlanService.getWorkoutPlanById().subscribe({
      next: (routines) => {
        this.routines = routines;
        //console.log(this.routines);
      }
    });
    
  }

}
