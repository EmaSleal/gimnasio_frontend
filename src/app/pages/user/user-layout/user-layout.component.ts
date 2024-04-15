import { Component } from '@angular/core';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { AddUserComponent } from '../add-user/add-user.component';
import { ListUserComponent } from '../list-user/list-user.component';
import {  ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [ MatTabsModule, AddUserComponent, ListUserComponent,RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

   index = 0;
  ngOnInit(): void {
    // Obtener la ruta actual
    const currentUrl = this.router.url;
    
    // Seleccionar el tab correspondiente
    switch (currentUrl) {
      case '/user/list':
        this.selectTab(0);
        break;
      case '/user':
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
        console.log('Listar usuarios');
        this.router.navigateByUrl('/user/list');
        break;
      case 1:
        console.log('Agregar usuario');
        this.router.navigateByUrl('/user');
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