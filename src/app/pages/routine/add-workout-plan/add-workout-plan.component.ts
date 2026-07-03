import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { WorkoutPlanService } from '../../../core/service/workout-plan/workout-plan.service';
import { UserService } from '../../../core/service/user/user.service';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import Swal from 'sweetalert2';
import { CardComponent } from '../../../utils/card/card.component';
import { DropdownModule } from 'primeng/dropdown';
import { User } from '../../../core/models/user.interface';
import { DayOfWeek } from '../../../core/models/day-of-week.enum';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { Workout } from '../../../core/models/workout.interface';
import { AddDailyRoutineComponent } from '../../daily-routine/add-daily-routine/add-daily-routine.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Subscription } from 'rxjs';
import { AddDailyRoutineTabsComponent } from '../../daily-routine/add-daily-routine-tabs/add-daily-routine-tabs.component';
import { DailyRoutine } from '../../../core/models/daily-routine.interface';
import { WorkoutPlan } from '../../../core/models/workout-plan.interface';
import { MenuItem } from 'primeng/api';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-add-workout-plan',
  standalone: true,
  imports: [
    ButtonModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    CardComponent,
    DropdownModule,
    CalendarModule,
    TabViewModule,
    CheckboxModule,
    AccordionModule,
    AddDailyRoutineComponent,
    InputSwitchModule,
    RadioButtonModule,
    AddDailyRoutineTabsComponent,
  ],
  templateUrl: './add-workout-plan.component.html',
  styleUrl: './add-workout-plan.component.scss',
})
export class AddWorkoutPlanComponent implements OnInit {

  Formulario1: FormGroup = new FormGroup({});
  dailyRoutineFormArray: FormGroup = new FormGroup({});
  users: User[] = [];
  days: DayOfWeek[] = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
  isTemplate: boolean = false;
  selected = new FormControl(0);
  activeIndex: number = 0;
  workoutListForm: FormGroup = new FormGroup({});
  workouts: Workout[] = [];
  templates: any[] = [];
  submit: boolean = false;
  templateValueDailyRoutines: DailyRoutine[] = [];
  IsTemplateValueChanged: boolean = false;
  currentUser: any;

  steps: MenuItem[] = [
    { label: 'Datos Generales' },
    { label: 'Rutinas' },
  ];

  userOptions: { label: string; value: number }[] = [];
  templateOptions: { label: string; value: any }[] = [];

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
      startDate: new FormControl(new Date(year, month, today.getDate())),
      endDate: new FormControl(new Date(year, month, today.getDate())),
      isTemplate: [false, Validators.required],
    });

    this.dailyRoutineFormArray =
      this.formBuilder.group({
        dailyRoutines: this.formBuilder.array([
          this.createDailyRoutineForm()
        ])
      });

    this.userService.getUsersCreatedBy().subscribe({
      next: (res) => {
        this.users = res;
        this.userOptions = res.map(u => ({ label: u.username, value: u.id }));
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.workoutListForm = this.formBuilder.group({
      workouts: this.formBuilder.array([]),
    });

    this.workoutService.getWorkouts().subscribe((res) => {
      this.workouts = res;
    });

    this.userService.getUserByCookie().subscribe({
      next: (res) => {
        this.currentUser = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createDailyRoutineForm(): FormGroup {
    return this.formBuilder.group({
      days: [[], Validators.required],
      workoutSpecification: this.formBuilder.array([])
    });
  }

  onSubmit() {
    if (this.submit) {
      this.submit = false;
    } else {
      this.submit = true;
    }
  }

  formSubmit(data: any) {
    data.map((form: any) => {
      form.workoutSpecification.map((form2: any) => {
        form2.workout = { id: form2.workout };
        delete form2.id;
      });
    });

    let workoutPlan: WorkoutPlan = {
      userId: this.Formulario1.value.user,
      trainerId: this.currentUser.id,
      description: this.Formulario1.value.description,
      status: '',
      startDate: this.Formulario1.value.startDate,
      endDate: this.Formulario1.value.endDate,
      createdAt: '',
      updatedAt: null,
      isTemplate: this.Formulario1.value.isTemplate,
      dailyRoutine: data
    };

    this.workoutPlanService.saveWorkoutPlan(workoutPlan).subscribe({
      next: () => {
        Swal.fire('Workout Plan created', 'The workout plan has been created successfully', 'success');
      },
      error: (err) => {
        Swal.fire('Error', 'An error occurred while creating the workout plan', 'error');
      }
    });
  }

  toggleIsTemplate() {
    this.isTemplate = !this.isTemplate;
  }

  getTemplates() {
    this.isTemplate = true;
    this.workoutPlanService.getTemplates().subscribe({
      next: (res) => {
        this.templates = res;
        this.templateOptions = res.map((t: any) => ({ label: t.description, value: t }));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onTemplateChange($event: any) {
    const dailyRoutines = $event.value.dailyRoutine;
    this.templateValueDailyRoutines = dailyRoutines;
  }

  checkFormChanged(isChanged: boolean) {
    isChanged ? this.IsTemplateValueChanged = true : this.IsTemplateValueChanged = false;
  }
}
