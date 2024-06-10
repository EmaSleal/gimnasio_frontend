import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { DailyRoutine } from '../../core/models/daily-routine.interface';
import { WorkoutDialogComponent } from '../../pages/routine/workout-dialog/workout-dialog.component';
import { WorkoutSpecification } from '../../core/models/workout-specification.interface';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTabsModule, MatSelectModule, MatExpansionModule, 

    ButtonModule, 
    CarouselModule, 
    FormsModule,],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnChanges{
  @Input() filteredRoutines: DailyRoutine[] = [];
  currentIndex: number = 0;

  constructor(private dialog: MatDialog) {}
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.filteredRoutines);

  }

  secsToMinutes(secs: number): number {
    return secs > 60 ? secs / 60 : secs;
  }

  openDialog(workoutSpec: WorkoutSpecification) {
    this.dialog.open(WorkoutDialogComponent, {
      width: '250px',
      data: workoutSpec
    });
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.filteredRoutines.length - 1) {
      this.currentIndex++;
    }
  }

  hasPrevious(): boolean {
    return this.currentIndex > 0;
  }

  hasNext(): boolean {
    return this.currentIndex < this.filteredRoutines.length - 1;
  }
}
