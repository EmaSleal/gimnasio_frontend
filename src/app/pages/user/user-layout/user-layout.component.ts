import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { AddUserComponent } from '../add-user/add-user.component';
import { ListUserComponent } from '../list-user/list-user.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [TabViewModule, AddUserComponent, ListUserComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  index = 0;

  ngOnInit(): void {
    const currentUrl = this.router.url;
    switch (currentUrl) {
      case '/user/list':
        this.onTabChange({ index: 0 });
        break;
      case '/user':
        this.onTabChange({ index: 1 });
        break;
      default:
        break;
    }
  }

  onTabChange(event: { index: number }) {
    this.index = event.index;
    switch (event.index) {
      case 0:
        this.router.navigateByUrl('/user/list');
        break;
      case 1:
        this.router.navigateByUrl('/user');
        break;
      default:
        break;
    }
  }

  isActive(route: string): boolean {
    return route === this.router.url;
  }
}
