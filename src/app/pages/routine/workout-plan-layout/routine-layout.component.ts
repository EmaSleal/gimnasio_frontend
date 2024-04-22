import { Component } from '@angular/core';
import { AddWorkoutPlanComponent } from '../add-workout-plan/add-workout-plan.component';
import { ListRoutineComponent } from '../list-workout-plan/list-routine.component';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-routine-layout',
  standalone: true,
  imports: [ MatTabsModule, AddWorkoutPlanComponent, ListRoutineComponent,RouterOutlet],
  templateUrl: './routine-layout.component.html',
  styleUrl: './routine-layout.component.scss'
})
export class RoutineLayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  index = 0;
 ngOnInit(): void {
   // Obtener la ruta actual
   const currentUrl = this.router.url;
   
   // Seleccionar el tab correspondiente
   switch (currentUrl) {
     case '/workout-plan/list':
       this.selectTab(0);
       break;
     case '/workout-plan':
       this.selectTab(1);
       break;
     default:
       break;
   }
 }

 // Función para seleccionar el tab dado su índice
 selectTab(index: number) {
   // Emitir un evento de cambio de tab
   this.index = index;
   const event: MatTabChangeEvent = { index } as MatTabChangeEvent;
   this.onTabChange(event);
 }

 // Manejar el cambio de tab
 onTabChange(event: MatTabChangeEvent) {
   switch (event.index) {
     case 0:
       //console.log('Listar usuarios');
       this.router.navigateByUrl('/workout-plan/list');
       break;
     case 1:
       //console.log('Agregar usuario');
       this.router.navigateByUrl('/workout-plan');
       break;
     default:
       break;
   }
 }

 isActive(route: string): boolean {
   if(route === this.router.url){
     return true;
   }
   return false;
 }
}
