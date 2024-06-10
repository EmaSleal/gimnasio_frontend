import { Routes } from '@angular/router';
import { UserHomeLayoutComponent } from './user-home-layout/user-home-layout.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: UserHomeLayoutComponent,
    children: [
      // { path: '', component: AddWorkoutPlanComponent },

      // { path: 'edit', component: EditRoutineComponent },

      { path: 'list', component: HomeComponent },

      // { path: ':id', component: RoutineComponent },
    ],
  },
];

