import { Component } from '@angular/core';
import { WorkoutSpecification } from '../../../core/models/workout-specification.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-workout-dialog',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './workout-dialog.component.html',
  styleUrl: './workout-dialog.component.scss'
})
export class WorkoutDialogComponent {
  data: WorkoutSpecification;

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    this.data = this.config.data as WorkoutSpecification;
  }
}
