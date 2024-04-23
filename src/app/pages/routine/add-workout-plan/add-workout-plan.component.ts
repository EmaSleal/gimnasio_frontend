import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  Formulario2: FormGroup = new FormGroup({});
  users: User[] = [];
  //list of days of week
  daysOfWeek: DayOfWeek[] = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
  dailyRoutines: any[] = [];
  tabs: string[] = ['New'];
  panels: string[] = ['New'];
  selected = new FormControl(0);
  step = 0;

  
  constructor(
    private formBuilder: FormBuilder, 
    private workoutPlanService: WorkoutPlanService, 
    private userService: UserService, 
    private workoutService: WorkoutService, 
    private changeDetectorRef: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.Formulario1 = this.formBuilder.group({
      user: ['', Validators.required],
      description: ['', Validators.required],
      startDate_endDate: ['', Validators.required],
      startDate: new FormControl(new Date(year, month, today.getDate())),
      endDate: new FormControl(new Date(year, month, today.getDate())),
    });

    this.userService.getUsersCreatedBy().then((res) => {
      this.users = res;
    }, (err) => {
      console.log(err);
    });

    //add to dailyRoutines a new DailyRoutine
    this.dailyRoutines.push({days: [], workoutSpecification: []});
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
    this.tabs.push('New');
    //add to dailyRoutines a new DailyRoutine
    this.dailyRoutines.push({ days: [], workoutSpecification: []});
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }

  getDay(day: DayOfWeek, index: number) {
    //add to dailyRoutines the day of the week 
    this.dailyRoutines[index].days.push(day);

  }

  addPanel(selectAfterAdding: boolean) {
    this.panels.push('New');
    if (selectAfterAdding) {
      this.selected.setValue(this.panels.length - 1);
    }
  }

  removePanel(index: number) {
    this.panels.splice(index, 1);
    this.selected.setValue(index);
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
}
