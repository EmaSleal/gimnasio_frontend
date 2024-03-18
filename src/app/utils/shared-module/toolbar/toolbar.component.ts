import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { NavbarService } from 'src/app/service/navbar/navbar.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {


  constructor(private navbarService:NavbarService, private loginservice: LoginService) { }


  public showNavBar(){
    return this.navbarService.toggleNavbar();
  }
  logout() {
    this.loginservice.logout();
  }
}
