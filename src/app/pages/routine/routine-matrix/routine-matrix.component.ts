import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, computed, signal } from '@angular/core';
import { WorkoutPlan } from '../../../core/models/workout-plan.interface';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { WorkoutSpecification } from '../../../core/models/workout-specification.interface';
import { WorkoutDialogComponent } from '../workout-dialog/workout-dialog.component';
import { CardComponent } from '../../../utils/card/card.component';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { DayOfWeek } from '../../../core/models/day-of-week.enum';
import { DropdownModule } from 'primeng/dropdown';
import { DailyRoutine } from '../../../core/models/daily-routine.interface';
import { CarouselComponent } from '../../../utils/carousel/carousel.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routine-matrix',
  standalone: true,
  imports: [DynamicDialogModule, CardComponent, CommonModule, TabViewModule, DropdownModule, CarouselComponent, DataViewModule, TagModule, ButtonModule, FormsModule],
  templateUrl: './routine-matrix.component.html',
  styleUrls: ['./routine-matrix.component.scss']
})
export class RoutineMatrixComponent implements OnChanges, OnInit {
  daySelected: DayOfWeek = DayOfWeek.MONDAY;
  panelClass: string = '';
  widthType: string = '';
  layout: string = "list";
  @Input() routines: WorkoutPlan[] = [];
  days: DayOfWeek[] = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];

  dayOptions: { label: string; value: DayOfWeek | undefined }[] = [
    { label: 'Seleccionar', value: undefined },
    ...([DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY]
      .map(d => ({ label: d, value: d })))
  ];

  filteredRoutines = signal<DailyRoutine[]>([]);

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.updateFilteredRoutines();
    this.getCurrentDay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['daySelected'] || changes['routines']) {
      this.updateFilteredRoutines();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setWidth();
  }

  @HostListener('window:load', ['$event'])
  setWidth() {
    const width = window.innerWidth;
    if (width <= 600) {
      this.widthType = 'small';
    } else if (width > 600 && width <= 960) {
      this.widthType = 'medium';
    } else if (width > 960 && width <= 1280) {
      this.widthType = 'large';
    } else if (width > 1280) {
      this.widthType = 'extra-large';
    }
  }

  updateFilteredRoutines() {
    this.filteredRoutines.set(
      this.routines[0]?.dailyRoutine.filter(daily => daily.days.includes(this.daySelected)) || []
    );
  }

  trackRoutine(index: number, item: any) {
    return item.id;
  }

  trackDaily(index: number, item: any) {
    return item.id;
  }

  trackWorkout(index: number, item: any) {
    return item.id;
  }

  openDialog(workoutSpec: WorkoutSpecification) {
    this.dialogService.open(WorkoutDialogComponent, {
      data: workoutSpec,
      header: workoutSpec.workout?.name || 'Workout',
      width: '400px',
    });
  }

  secsToMinutes(secs: number): number {
    return secs > 60 ? secs / 60 : secs;
  }

  ChangeClass(muscularLoad: string) {
    if (muscularLoad === 'LOW') {
      return 'success';
    } else if (muscularLoad === 'MEDIUM') {
      return 'warning';
    } else if (muscularLoad === 'HIGH') {
      return 'danger';
    }
    return 'contrast';
  }

  getCurrentDay() {
    const today = new Date().getDay();
    switch (today) {
      case 0: this.daySelected = DayOfWeek.SUNDAY; break;
      case 1: this.daySelected = DayOfWeek.MONDAY; break;
      case 2: this.daySelected = DayOfWeek.TUESDAY; break;
      case 3: this.daySelected = DayOfWeek.WEDNESDAY; break;
      case 4: this.daySelected = DayOfWeek.THURSDAY; break;
      case 5: this.daySelected = DayOfWeek.FRIDAY; break;
      case 6: this.daySelected = DayOfWeek.SATURDAY; break;
    }
  }
}
