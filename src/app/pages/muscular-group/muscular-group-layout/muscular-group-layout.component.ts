import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AddMuscularGroupComponent } from '../add-muscular-group/add-muscular-group.component';
import { ListMuscularGroupComponent } from '../list-muscular-group/list-muscular-group.component';

@Component({
  selector: 'app-muscular-group-layout',
  standalone: true,
  imports: [TabViewModule, AddMuscularGroupComponent, ListMuscularGroupComponent, RouterOutlet],
  templateUrl: './muscular-group-layout.component.html',
  styleUrl: './muscular-group-layout.component.scss'
})
export class MuscularGroupLayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  index = 0;

  ngOnInit(): void {
    const currentUrl = this.router.url;
    switch (currentUrl) {
      case '/muscular-group/list':
        this.onTabChange({ index: 0 });
        break;
      case '/muscular-group':
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
        this.router.navigateByUrl('/muscular-group/list');
        break;
      case 1:
        this.router.navigateByUrl('/muscular-group');
        break;
      default:
        break;
    }
  }

  isActive(route: string): boolean {
    return route === this.router.url;
  }
}
