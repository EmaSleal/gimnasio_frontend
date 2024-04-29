import { Component } from '@angular/core';
import { AddDailyRoutineComponent } from '../add-daily-routine/add-daily-routine.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-daily-routine-layout',
  standalone: true,
  imports: [AddDailyRoutineComponent, RouterOutlet, MatTabsModule],
  templateUrl: './daily-routine-layout.component.html',
  styleUrl: './daily-routine-layout.component.scss'
})
export class DailyRoutineLayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  index = 0;
 ngOnInit(): void {
   // Obtener la ruta actual
   const currentUrl = this.router.url;
   
   // Seleccionar el tab correspondiente
   switch (currentUrl) {
     case '/daily-routine/list':
       this.selectTab(0);
       break;
     case '/daily-routine':
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
       this.router.navigateByUrl('/daily-routine/list');
       break;
     case 1:
       //console.log('Agregar usuario');
       this.router.navigateByUrl('/daily-routine');
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
