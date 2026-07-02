import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { DailyRoutine } from '../../core/models/daily-routine.interface';
import { WorkoutDialogComponent } from '../../pages/routine/workout-dialog/workout-dialog.component';
import { WorkoutSpecification } from '../../core/models/workout-specification.interface';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    DynamicDialogModule,
    TabViewModule,
    DropdownModule,
    AccordionModule,
    TagModule,
    ButtonModule,
    CarouselModule,
    FormsModule,
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnChanges {
  @Input() filteredRoutines: DailyRoutine[] = [];
  currentIndex: number = 0;

  constructor(private dialogService: DialogService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // reactive to input changes
  }

  secsToMinutes(secs: number): number {
    return secs > 60 ? secs / 60 : secs;
  }

  openDialog(workoutSpec: WorkoutSpecification) {
    this.dialogService.open(WorkoutDialogComponent, {
      data: workoutSpec,
      header: workoutSpec.workout?.name || 'Workout',
      width: '400px',
    });
  }

  ChangeClass(muscularLoad: string) {
    if (muscularLoad === 'LOW') {
      return 'success';
    } else if (muscularLoad === 'MEDIUM') {
      return 'warning';
    } else if (muscularLoad === 'HIGH') {
      return 'danger';
    }
    return undefined;
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
