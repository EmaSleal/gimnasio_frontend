import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../core/service/login/login.service';
import { NavbarService } from '../../core/service/navbar/navbar.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
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
