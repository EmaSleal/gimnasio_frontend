import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../core/models/user.interface';
import { UserService } from '../../../core/service/user/user.service';
import { CardComponent } from '../../../utils/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  user: User | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    // Obtengo el id del usuario de la URL
    const id = this.route.snapshot.paramMap.get('id') as string;
    // Obtengo el usuario por id
    this.userService.getUserById(id).then((user) => {
      this.user = user;
      console.log(this.user);
    });
    
  }
}
