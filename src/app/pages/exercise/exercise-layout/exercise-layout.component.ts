import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { ListExerciseComponent } from '../list-exercise/list-exercise.component';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-exercise-layout',
  standalone: true,
  imports: [TabViewModule, AddExerciseComponent, ListExerciseComponent, RouterOutlet],
  templateUrl: './exercise-layout.component.html',
  styleUrl: './exercise-layout.component.scss'
})
export class ExerciseLayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  index = 0;

  ngOnInit(): void {
    const currentUrl = this.router.url;
    switch (currentUrl) {
      case '/exercise/list':
        this.onTabChange({ index: 0 });
        break;
      case '/exercise':
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
        this.router.navigateByUrl('/exercise/list');
        break;
      case 1:
        this.router.navigateByUrl('/exercise');
        break;
      default:
        break;
    }
  }

  isActive(route: string): boolean {
    return route === this.router.url;
  }
}
