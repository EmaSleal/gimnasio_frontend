import { Routes } from '@angular/router';
import { LoginComponent } from './utils/login/login.component';
import { HomeComponent } from './pages/user-home/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Role } from './core/models/role.enum';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

export const routes: Routes = [
    //si el path es vacio redirige a login
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },

    { path: 'exercise', loadChildren: () => import('./pages/exercise/exercise.routes').then(m => m.routes), canActivate: [authGuard, roleGuard(Role.ADMIN, Role.TRAINER)] },
    { path: 'user', loadChildren: () => import('./pages/user/user.routes').then(m => m.routes), canActivate: [authGuard, roleGuard(Role.ADMIN)] },
    { path: 'muscular-group', loadChildren: () => import('./pages/muscular-group/muscular-group.routes').then(m => m.routes), canActivate: [authGuard, roleGuard(Role.ADMIN, Role.TRAINER)] },
    { path: 'workout-plan', loadChildren: () => import('./pages/routine/routine.routes').then(m => m.routes), canActivate: [authGuard, roleGuard(Role.ADMIN, Role.TRAINER)] },
    { path: 'daily-routine', loadChildren: () => import('./pages/daily-routine/daily-routine.routes').then(m => m.routes), canActivate: [authGuard, roleGuard(Role.ADMIN, Role.TRAINER)] },
    { path: 'user-home', loadChildren: () => import('./pages/user-home/routine.routes').then(m => m.routes), canActivate: [authGuard] },
    {
        path: 'my-plan',
        loadComponent: () => import('./pages/workout-plan-client/workout-plan-client.component')
            .then(m => m.WorkoutPlanClientComponent),
        canActivate: [authGuard, roleGuard(Role.CLIENT, Role.ADMIN)]
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
];

 