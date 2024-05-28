import { Component, Input, OnInit } from '@angular/core';
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
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { MuscularGroup } from '../../../core/models/muscular-group.interface';
import { FormService } from '../../../core/service/form-service/form.service';
import { MuscularLoad } from '../../../core/models/muscular-load.enum';

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
    private muscularGroupService: MuscularGroupService, 
    private formService: FormService
  ) {}

  @Input() formIndex: number = 0;
  daysOfWeek: DayOfWeek[] = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
  dailyRoutineForm: FormGroup = new FormGroup({});
  workouts: Workout[] = [];
  muscularGroups: MuscularGroup[] = [];
  muscularLoads: MuscularLoad[] = [MuscularLoad.LOW, MuscularLoad.MEDIUM, MuscularLoad.HIGH];
  step: number = 0;
  selectedMuscularGroup = '';
  selectedMuscularLoad = '';

  ngOnInit(): void {
    this.dailyRoutineForm = this.formBuilder.group({
      daysOfWeek: ['', Validators.required],
      workoutSpecification: this.formBuilder.array([])
    });

    this.workoutService.getWorkouts().subscribe((res) => {
      this.workouts = res;
    });

    this.muscularGroupService.getMuscularGroups().then((res) => {
      this.muscularGroups = res;
    });
    //console.log(this.formIndex);
    const valueIndex = this.formService.getForm(this.formIndex);
    if (valueIndex) {
      this.dailyRoutineForm.patchValue({
        daysOfWeek: valueIndex.daysOfWeek.value || []
      });
      //console.log(valueIndex);
      // Si valueIndex tiene valores para workoutSpecification, llenarlos
      if (valueIndex.workoutSpecification) {
        valueIndex.workoutSpecification?.value?.forEach((spec: any) => {
          this.workoutSpecifications.push(this.createWorkoutSpecificationForm(spec));
        });
        console.log(valueIndex.workoutSpecification);
      }
    } else {
      this.formService.addForm(this.dailyRoutineForm);
    }
  }

  get workoutSpecifications() {
    return this.dailyRoutineForm.get('workoutSpecification') as FormArray;
  }

  addWorkoutSpecification() {
    this.workoutSpecifications.push(this.createWorkoutSpecificationForm());
  }

  createWorkoutSpecificationForm(data: any = {}): FormGroup {
    return this.formBuilder.group({
      id: [data.id || ''],
      description: [data.description || '', Validators.required],
      repsNumber: [data.repsNumber || 0, Validators.required],
      setsNumber: [data.setsNumber || 0, Validators.required],
      recommendedWeight: [data.recommendedWeight || 0],
      trainerRating: [data.trainerRating || 0, Validators.required],
      workout: [data.workout.id || '', Validators.required], // Assuming Workout form group or control exists
      timeBased: [data.timeBased || false],
      time: [data.time || 0],
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
  getWorkoutsByMuscularGroup($event: any) {
    this.selectedMuscularGroup = $event.value;
    //console.log($event.value);
  }
}
