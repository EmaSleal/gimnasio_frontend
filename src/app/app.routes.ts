import { Routes } from '@angular/router';
import { LoginComponent } from './utils/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    //si el path es vacio redirige a login
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },

    { path: 'exercise', loadChildren: () => import('./pages/exercise/exercise.routes').then(m => m.routes)}
  ];