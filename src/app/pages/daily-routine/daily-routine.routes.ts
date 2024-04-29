import { Routes } from '@angular/router';
import { AddDailyRoutineComponent } from './add-daily-routine/add-daily-routine.component';
import { DailyRoutineLayoutComponent } from './daily-routine-layout/daily-routine-layout.component';


export const routes: Routes = [
  {
    path: '',
    component: DailyRoutineLayoutComponent,
    children: [
      { path: '', component: AddDailyRoutineComponent },

    ],
  },
];

