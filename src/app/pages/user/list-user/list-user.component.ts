import { Component } from '@angular/core';
import { TableComponent } from '../../../utils/table/table.component';
import { CardComponent } from '../../../utils/card/card.component';
import { User } from '../../../core/models/user.interface';
import { UserService } from '../../../core/service/user/user.service';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [TableComponent, CardComponent, DynamicDialogModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {

  constructor(private userService: UserService, private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource = users;
    });
  }

  displayedColumns: string[] = [
    'username',
    'email',
    'role',
    'enabled',
    'createdAt',
    'acciones'
  ];

  dataSource: User[] = [];

  editUser(user: User) {
    const ref = this.dialogService.open(EditUserComponent, {
      data: { user },
      header: 'Edit User',
      width: '50%',
    });

    ref.onClose.subscribe((result) => {
      console.log('Modal cerrado con resultado:', result);
    });
  }

  eliminarUser(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.dataSource = this.dataSource.filter((u) => u.id !== user.id);
          Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
        });
      }
    });
  }

  selectUser(user: any) {
    this.router.navigate(['user', user.id], { state: { user } });
  }
}
