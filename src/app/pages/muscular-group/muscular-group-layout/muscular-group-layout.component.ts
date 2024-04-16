import { Component } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AddMuscularGroupComponent } from '../add-muscular-group/add-muscular-group.component';
import { ListMuscularGroupComponent } from '../list-muscular-group/list-muscular-group.component';


@Component({
  selector: 'app-muscular-group-layout',
  standalone: true,
  imports: [ MatTabsModule, AddMuscularGroupComponent, ListMuscularGroupComponent,RouterOutlet],
  templateUrl: './muscular-group-layout.component.html',
  styleUrl: './muscular-group-layout.component.scss'
})
export class MuscularGroupLayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

   index = 0;
  ngOnInit(): void {
    // Obtener la ruta actual
    const currentUrl = this.router.url;
    
    // Seleccionar el tab correspondiente
    switch (currentUrl) {
      case '/muscular-group/list':
        this.selectTab(0);
        break;
      case '/muscular-group':
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
        this.router.navigateByUrl('/muscular-group/list');
        break;
      case 1:
        //console.log('Agregar usuario');
        this.router.navigateByUrl('/muscular-group');
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
