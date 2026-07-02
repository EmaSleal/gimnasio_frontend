import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { AddDailyRoutineComponent } from '../add-daily-routine/add-daily-routine.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-daily-routine-layout',
  standalone: true,
  imports: [TabViewModule, AddDailyRoutineComponent, RouterOutlet],
  templateUrl: './daily-routine-layout.component.html',
  styleUrl: './daily-routine-layout.component.scss'
})
export class DailyRoutineLayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  index = 0;

  ngOnInit(): void {
    const currentUrl = this.router.url;
    switch (currentUrl) {
      case '/daily-routine/list':
        this.onTabChange({ index: 0 });
        break;
      case '/daily-routine':
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
        this.router.navigateByUrl('/daily-routine/list');
        break;
      case 1:
        this.router.navigateByUrl('/daily-routine');
        break;
      default:
        break;
    }
  }

  isActive(route: string): boolean {
    return route === this.router.url;
  }
}
