import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { CardComponent } from '../../../utils/card/card.component';
import { DayOfWeek } from '../../../core/models/day-of-week.enum';
import { UserService } from '../../../core/service/user/user.service';
import { WorkoutPlanService } from '../../../core/service/workout-plan/workout-plan.service';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import { Workout } from '../../../core/models/workout.interface';

@Component({
  selector: 'app-add-daily-routine',
  standalone: true,
  imports: [    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CardComponent,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatExpansionModule],
  templateUrl: './add-daily-routine.component.html',
  styleUrl: './add-daily-routine.component.scss'
})
export class AddDailyRoutineComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder, 
    private workoutPlanService: WorkoutPlanService, 
    private userService: UserService, 
    private workoutService: WorkoutService, 
  ) {}

  daysOfWeek: DayOfWeek[] = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
  dailyRoutineForm: FormGroup = new FormGroup({});
  workouts: Workout[] = [];
  step: number = 0;

  ngOnInit(): void {
    this.dailyRoutineForm = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      daysOfWeek: [this.daysOfWeek, Validators.required],
      workoutSpecification: this.formBuilder.array([])
    });

    this.workoutService.getWorkouts().subscribe((res) => {
      this.workouts = res;
    });
  }

  get workoutSpecifications() {
    return this.dailyRoutineForm.get('workoutSpecification') as FormArray;
  }
  addWorkoutSpecification() {
    this.workoutSpecifications.push(this.createWorkoutSpecificationForm());
  }

  createWorkoutSpecificationForm(): FormGroup {
    return this.formBuilder.group({
        id: [''],
        description: ['', Validators.required], // Validador síncrono
        repsNumber: [0, Validators.required], // Validador síncrono
        setsNumber: [0, Validators.required], // Validador síncrono
        recommendedWeight: [0],
        trainerRating: [0, Validators.min(1), Validators.max(5)], // Validadores síncronos
        workout: [''] // Assuming Workout form group or control exists
    });
}

  setStep(index: number) {
    this.step = index;
  }

  removeWorkoutFormGroup(index: number) {
    this.workoutSpecifications.removeAt(index);
  }

  get cantidadEjercicios(): number {
    return this.workoutSpecifications.length;
  }
}
