import { Component, Inject } from '@angular/core';
import { WorkoutSpecification } from '../../../core/models/workout-specification.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-workout-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './workout-dialog.component.html',
  styleUrl: './workout-dialog.component.scss'
})
export class WorkoutDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: WorkoutSpecification) {}
}
