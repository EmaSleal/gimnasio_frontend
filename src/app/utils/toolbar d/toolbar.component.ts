import { Component } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { NavbarService } from '../../service/navbar/navbar.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule,MatIconModule]
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
