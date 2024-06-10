import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CardComponent } from '../../../utils/card/card.component';

@Component({
  selector: 'app-user-home-layout',
  standalone: true,
  imports: [HomeComponent, CardComponent],
  templateUrl: './user-home-layout.component.html',
  styleUrl: './user-home-layout.component.scss'
})
export class UserHomeLayoutComponent {

}
