import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { AddWorkoutPlanComponent } from '../add-workout-plan/add-workout-plan.component';
import { ListRoutineComponent } from '../list-workout-plan/list-routine.component';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routine-layout',
  standalone: true,
  imports: [TabViewModule, AddWorkoutPlanComponent, ListRoutineComponent, RouterOutlet],
  templateUrl: './routine-layout.component.html',
  styleUrl: './routine-layout.component.scss'
})
export class RoutineLayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  index = 0;

  ngOnInit(): void {
    const currentUrl = this.router.url;
    switch (currentUrl) {
      case '/workout-plan/list':
        this.onTabChange({ index: 0 });
        break;
      case '/workout-plan':
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
        this.router.navigateByUrl('/workout-plan/list');
        break;
      case 1:
        this.router.navigateByUrl('/workout-plan');
        break;
      default:
        break;
    }
  }

  isActive(route: string): boolean {
    return route === this.router.url;
  }
}
