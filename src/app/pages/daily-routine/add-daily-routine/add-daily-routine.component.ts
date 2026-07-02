import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardComponent } from '../../../utils/card/card.component';
import { DayOfWeek } from '../../../core/models/day-of-week.enum';
import { UserService } from '../../../core/service/user/user.service';
import { WorkoutPlanService } from '../../../core/service/workout-plan/workout-plan.service';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import { Workout } from '../../../core/models/workout.interface';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { MuscularGroup } from '../../../core/models/muscular-group.interface';
import { MuscularLoad } from '../../../core/models/muscular-load.enum';

@Component({
  selector: 'app-add-daily-routine',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    CardComponent,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    AccordionModule,
  ],
  templateUrl: './add-daily-routine.component.html',
  styleUrl: './add-daily-routine.component.scss'
})
export class AddDailyRoutineComponent implements OnInit {
  @Input() formIndex: number = 0;
  days: DayOfWeek[] = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
  dailyRoutineForm: FormGroup = new FormGroup({});
  workouts: Workout[] = [];
  muscularGroups: MuscularGroup[] = [];
  muscularLoads: MuscularLoad[] = [MuscularLoad.LOW, MuscularLoad.MEDIUM, MuscularLoad.HIGH];
  step: number = 0;
  selectedMuscularGroup = '';
  selectedMuscularLoad = '';

  dayOptions: { label: string; value: DayOfWeek }[] = [];
  muscularGroupOptions: { label: string; value: string }[] = [];
  muscularLoadOptions: { label: string; value: string }[] = [];
  workoutOptions: { label: string; value: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private workoutPlanService: WorkoutPlanService,
    private userService: UserService,
    private workoutService: WorkoutService,
    private muscularGroupService: MuscularGroupService,
  ) {}

  ngOnInit(): void {
    this.dailyRoutineForm = this.formBuilder.group({
      days: [[], Validators.required],
      workoutSpecification: this.formBuilder.array([])
    });

    this.dayOptions = this.days.map(d => ({ label: d, value: d }));
    this.muscularLoadOptions = this.muscularLoads.map(ml => ({ label: ml, value: ml }));

    this.workoutService.getWorkouts().subscribe((res) => {
      this.workouts = res;
      this.updateWorkoutOptions();
    });

    this.muscularGroupService.getMuscularGroups().subscribe({
      next: (res) => {
        this.muscularGroups = res;
        this.muscularGroupOptions = res.map(mg => ({ label: mg.name || '', value: mg.id || '' }));
      }
    });
  }

  updateWorkoutOptions() {
    this.workoutOptions = this.workouts
      .filter(w =>
        (!this.selectedMuscularGroup || w?.muscularGroup?.id === this.selectedMuscularGroup) &&
        (!this.selectedMuscularLoad || w.muscularLoad === this.selectedMuscularLoad)
      )
      .map(w => ({ label: w.name || '', value: w.id || '' }));
  }

  onMuscularGroupChange(value: string) {
    this.selectedMuscularGroup = value;
    this.updateWorkoutOptions();
  }

  onMuscularLoadChange(value: string) {
    this.selectedMuscularLoad = value;
    this.updateWorkoutOptions();
  }

  get workoutSpecifications() {
    return this.dailyRoutineForm.get('workoutSpecification') as FormArray;
  }

  workoutName(formValue: string): string {
    const workoutId = formValue;
    const workout = this.workouts.find(w => w.id === workoutId);
    return workout ? workout.name || '' : '';
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
      workout: [data.workout?.id || 0, Validators.required],
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
    this.updateWorkoutOptions();
  }
}
