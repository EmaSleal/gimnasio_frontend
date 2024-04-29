import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { WorkoutPlanService } from '../../../core/service/workout-plan/workout-plan.service';
import { UserService } from '../../../core/service/user/user.service';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import Swal from 'sweetalert2';
import { CardComponent } from '../../../utils/card/card.component';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../core/models/user.interface';
import { DayOfWeek } from '../../../core/models/day-of-week.enum';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { Workout } from '../../../core/models/workout.interface';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
@Component({
  selector: 'app-add-workout-plan',
  standalone: true,
  imports: [
    MatButtonModule,
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
    MatExpansionModule
  ],
  templateUrl: './add-workout-plan.component.html',
  styleUrl: './add-workout-plan.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AddWorkoutPlanComponent implements OnInit {


  Formulario1: FormGroup = new FormGroup({});
  dailyRoutineFormArray: FormGroup = new FormGroup({});
  users: User[] = [];
  //list of days of week
  daysOfWeek: DayOfWeek[] = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
  currentDailyRoutine: number = 0;
  //tabs: string[] = ['New'];

  selected = new FormControl(0);
  step = 0;
  workoutListForm: FormGroup = new FormGroup({});
  workouts: Workout[] = [];
  
  constructor(
    private formBuilder: FormBuilder, 
    private workoutPlanService: WorkoutPlanService, 
    private userService: UserService, 
    private workoutService: WorkoutService, 

  ) {}


  ngOnInit(): void {
    this.Formulario1 = this.formBuilder.group({
      user: ['', Validators.required],
      description: ['', Validators.required],
      startDate_endDate: ['', Validators.required],
      startDate: new FormControl(new Date(year, month, today.getDate())),
      endDate: new FormControl(new Date(year, month, today.getDate())),
    });

    this.dailyRoutineFormArray = 
      this.formBuilder.group({
        dailyRoutines: this.formBuilder.array([
          this.createDailyRoutineForm()
        ])
      });

    this.userService.getUsersCreatedBy().then((res) => {
      this.users = res;
    }, (err) => {
      console.log(err);
    });

    //add to dailyRoutines a new DailyRoutine
    //this.dailyRoutines.push({days: [], workoutSpecification: []});

    this.workoutListForm = this.formBuilder.group({
      workouts: this.formBuilder.array([]),
    });


    this.workoutService.getWorkouts().subscribe((res) => {
      this.workouts = res;
    });
  }

  addDailyRoutine() {
    this.dailyRoutines.push(this.createDailyRoutineForm());
  }

  removeDailyRoutine(index: number) {
    this.dailyRoutines.removeAt(index);
  }

  get workoutSpecifications(): FormArray {
    //from dailyRoutines usng the index of the currentDailyRoutine
    return this.dailyRoutines.at(this.currentDailyRoutine).get('workoutSpecification') as FormArray;
  }

  get dailyRoutines(): FormArray {
    return this.dailyRoutineFormArray.get('dailyRoutines') as FormArray;
  }

  createDailyRoutineForm(): FormGroup {
    return this.formBuilder.group({
      id: [{value: null, disabled: true}],
      daysOfWeek: [this.daysOfWeek, Validators.required],
      workoutSpecification: this.formBuilder.array([])
    });
  }

  submitForm() {
    if (this.Formulario1.invalid) {
      return;
    }
    this.workoutPlanService.saveWorkoutPlan(this.Formulario1.value).then(() => {
      Swal.fire('Workout Plan created', 'The workout plan has been created successfully', 'success');
    }, (err) => {
      Swal.fire('Error', 'An error occurred while creating the workout plan', 'error');
    });
  }



  addTab(selectAfterAdding: boolean) {
    //adding another dailyRoutine to the list
    this.dailyRoutines.push(this.createDailyRoutineForm());
    console.log(this.dailyRoutines.controls);
    if (selectAfterAdding) {
      this.selected.setValue(this.dailyRoutines.length - 1);
    }
  }

  removeTab(index: number) {
    this.dailyRoutines.removeAt(index);
    this.selected.setValue(index);
  }

  public getDay(day: DayOfWeek, index: number) {
    //add to dailyRoutines the day of the week 
    this.dailyRoutineFormArray.get('days')?.setValue(day);


  }

  addWorkoutSpecification() {
    
    const workoutSpecifications = this.dailyRoutines.at(this.selected.value || 0).get('workoutSpecification') as FormArray;
    workoutSpecifications.push(this.createWorkoutSpecificationForm());
    //console.log(workoutSpecifications);
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

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  get workoutFormArray() {
    return this.workoutListForm.get('workouts') as FormArray;
  }

  addWorkoutFormGroup(selectAfterAdding: boolean) {
    const workoutFormGroup = this.formBuilder.group({
      description: [],
      repsNumber: [],
      setsNumber: [],
      recommendedWeight: [],
      trainerRating: [],
      workout: []
    });
    if (selectAfterAdding) {
          this.selected.setValue(this.workoutFormArray.length - 1);
    }
    this.workoutFormArray.push(workoutFormGroup);
  }

  removeWorkoutFormGroup(index: number) {
    this.workoutFormArray.removeAt(index);
  }

  get cantidadEjercicios(): number {
    return this.workoutFormArray.length;
  }
}
