import { Routes } from '@angular/router';
import { AddWorkoutPlanComponent } from './add-workout-plan/add-workout-plan.component';
import { EditRoutineComponent } from './edit-workout-plan/edit-routine.component';
import { ListRoutineComponent } from './list-workout-plan/list-routine.component';
import { RoutineLayoutComponent } from './workout-plan-layout/routine-layout.component';
import { RoutineComponent } from './workout-plan/routine.component';

export const routes: Routes = [
  {
    path: '',
    component: RoutineLayoutComponent,
    children: [
      { path: '', component: AddWorkoutPlanComponent },

      { path: 'edit', component: EditRoutineComponent },

      { path: 'list', component: ListRoutineComponent },

      { path: ':id', component: RoutineComponent },
    ],
  },
];

