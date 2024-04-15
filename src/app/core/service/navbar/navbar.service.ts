import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  //creo una variable que me permita saber si el navbar esta visible o no
  visible:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //creo una funcion que me permita cambiar el valor de la variable visible
  toggleNavbar(){
    this.visible.next(!this.visible.value);//aqui
  }
  

  constructor() { }
}
