import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/service/auth/auth.service';
import { NavbarService } from '../../core/service/navbar/navbar.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  constructor(private navbarService: NavbarService, private authService: AuthService) { }

  public showNavBar() {
    return this.navbarService.toggleNavbar();
  }

  logout() {
    this.authService.logout();
  }
}
