import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { AddDailyRoutineComponent } from '../add-daily-routine/add-daily-routine.component';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DailyRoutine } from '../../../core/models/daily-routine.interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-daily-routine-tabs',
  standalone: true,
  imports: [TabViewModule, AddDailyRoutineComponent, ButtonModule],
  templateUrl: './add-daily-routine-tabs.component.html',
  styleUrls: ['./add-daily-routine-tabs.component.scss']
})
export class AddDailyRoutineTabsComponent implements OnInit, OnChanges {
  routines: FormGroup[] = [];
  IsFormValueChanged: Boolean = false;
  @Output() formSubmitted = new EventEmitter();
  @Output() IsFormChanged = new EventEmitter();
  @Input() TemplateValues: DailyRoutine[] = [];
  @Input() IsSubmitted: boolean = false;
  @Input() IsChanged: boolean = false;
  @ViewChildren(AddDailyRoutineComponent) routineComponents!: QueryList<AddDailyRoutineComponent>;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.TemplateValues.length > 0) {
      this.TemplateValues.forEach(template => this.addRoutine(template));
    } else {
      this.addRoutine();
    }
  }

  ngOnChanges(): void {
    if (this.IsSubmitted) {
      const allFormValues = this.routineComponents.map(component => component.dailyRoutineForm.value);
      this.formSubmitted.emit(allFormValues);
    }
    if (this.TemplateValues.length > 0) {
      this.populateFormsWithTemplateValues();
      this.formChanged();
    }
  }

  addRoutine(template?: DailyRoutine) {
    const workoutSpecificationArray = this.fb.array(
      template ? template.workoutSpecification.map(spec => this.createWorkoutSpecificationForm(spec)) : []
    );

    const routineForm = this.fb.group({
      days: [template ? template.days : ''],
      workoutSpecification: workoutSpecificationArray
    });

    this.routines.push(routineForm);
  }

  createWorkoutSpecificationForm(data: any = {}): FormGroup {
    return this.fb.group({
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

  populateFormsWithTemplateValues() {
    this.TemplateValues.forEach((template, index) => {
      if (this.routineComponents.get(index)) {
        this.routineComponents.get(index)!.dailyRoutineForm.patchValue(template);
        const workoutSpecificationFormArray = this.routineComponents.get(index)!.dailyRoutineForm.get('workoutSpecification') as FormArray;
        workoutSpecificationFormArray.clear();
        template.workoutSpecification.forEach(spec => {
          workoutSpecificationFormArray.push(this.createWorkoutSpecificationForm(spec));
        });
      } else {
        this.addRoutine(template);
      }
    });

    this.routines = this.routines.slice(0, this.TemplateValues.length);

    while (this.routines.length > this.TemplateValues.length) {
      this.routines.pop();
    }
  }

  submitAllForms() {
    const allFormValues = this.routineComponents.map(component => component.dailyRoutineForm.value);
    console.log('All Forms Values:', allFormValues);
  }

  formChanged() {
    this.IsFormChanged.emit(true);
  }
}
