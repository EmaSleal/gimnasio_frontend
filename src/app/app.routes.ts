import { Routes } from '@angular/router';
import { LoginComponent } from './utils/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    //si el path es vacio redirige a login
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },

    { path: 'exercise', loadChildren: () => import('./pages/exercise/exercise.routes').then(m => m.routes)},
    { path: 'user', loadChildren: () => import('./pages/user/user.routes').then(m => m.routes)},
    { path: 'muscular-group', loadChildren: () => import('./pages/muscular-group/muscular-group.routes').then(m => m.routes)},
    // { path: 'routine', loadChildren: () => import('./pages/routine/routine.routes').then(m => m.routes)},
    // { path: 'workout', loadChildren: () => import('./pages/workout/workout.routes').then(m => m.routes)}
  ];