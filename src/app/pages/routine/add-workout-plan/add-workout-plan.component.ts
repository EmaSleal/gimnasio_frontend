import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { ThemePalette, provideNativeDateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { Workout } from '../../../core/models/workout.interface';
import { AddDailyRoutineComponent } from '../../daily-routine/add-daily-routine/add-daily-routine.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { AddDailyRoutineTabsComponent } from '../../daily-routine/add-daily-routine-tabs/add-daily-routine-tabs.component';
import { DailyRoutine } from '../../../core/models/daily-routine.interface';
import { WorkoutPlan } from '../../../core/models/workout-plan.interface';

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
    MatExpansionModule,
    AddDailyRoutineComponent,
    MatSlideToggleModule,
    MatRadioModule,
    AddDailyRoutineTabsComponent
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
  days: DayOfWeek[] = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
  color: ThemePalette = 'accent';
  isTemplate: boolean = false;
  selected = new FormControl(0);
  step = 0;
  workoutListForm: FormGroup = new FormGroup({});
  workouts: Workout[] = [];
  templates: any[] = [];
  submit: boolean = false;
  templateValueDailyRoutines: DailyRoutine[] = [];
  IsTemplateValueChanged: boolean = false;
  currentUser: any;
  
  constructor(
    private formBuilder: FormBuilder, 
    private workoutPlanService: WorkoutPlanService, 
    private userService: UserService, 
    private workoutService: WorkoutService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.Formulario1 = this.formBuilder.group({
      user: ['', Validators.required],
      description: ['', Validators.required],
      startDate_endDate: ['', Validators.required],
      startDate: new FormControl(new Date(year, month, today.getDate())),
      endDate: new FormControl(new Date(year, month, today.getDate())),
      isTemplate: [false, Validators.required],
    });
    //TODO: eliminar propiedad dailyRoutineFormArray
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

    this.workoutListForm = this.formBuilder.group({
      workouts: this.formBuilder.array([]),
    });


    this.workoutService.getWorkouts().subscribe((res) => {
      this.workouts = res;
    });

    this.userService.getUserByCookie().then((res) => {
      this.currentUser = res;
    }, (err) => {
      console.log(err);
    });
    
  }

  createDailyRoutineForm(): FormGroup {
    return this.formBuilder.group({
      days: [[], Validators.required],
      workoutSpecification: this.formBuilder.array([])
    });
  }

  onSubmit() {
    if(this.submit){
      this.submit = false;
    }else{
      this.submit = true;
    }
  }

  formSubmit(data: any) {
    data.map((form: any) => {

      form.workoutSpecification.map((form2: any) =>{
        // console.log(form2);
        form2.workout = {id: form2.workout};
        //eliminamos el id del workoutSpecification
        delete form2.id;
      });
    });
    // console.log(this.currentUser)
    let workoutPlan : WorkoutPlan = {
      idUser: this.Formulario1.value.user,
      idTrainer: this.currentUser.id,
      description: this.Formulario1.value.description,
      status: '',
      startDate: this.Formulario1.value.startDate,
      endDate: this.Formulario1.value.endDate,
      createdAt: '',
      updatedAt: null,
      isTemplate: this.Formulario1.value.isTemplate,
      dailyRoutine: data
    };
    // console.log(workoutPlan);


    this.workoutPlanService.saveWorkoutPlan(workoutPlan).then(() => {
      Swal.fire('Workout Plan created', 'The workout plan has been created successfully', 'success');
    }, (err) => {
      Swal.fire('Error', 'An error occurred while creating the workout plan', 'error');
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

  toggleIsTemplate() {
    this.isTemplate = !this.isTemplate;
  }

  getTemplates() {
    this.isTemplate = true;
    this.workoutPlanService.getTemplates().then((res) => {
      this.templates = res;
    }, (err) => {
      console.log(err);
    });
  }

  onTemplateChange($event: any) {
    const dailyRoutines = $event.value.dailyRoutine;
    // console.log(dailyRoutines);
    this.templateValueDailyRoutines = dailyRoutines;

  }

  
  checkFormChanged(isChanged: boolean) {
    // console.log(isChanged);
    isChanged ? this.IsTemplateValueChanged = true : this.IsTemplateValueChanged = false;
  }
}
