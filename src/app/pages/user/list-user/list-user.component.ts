import { Component } from '@angular/core';
import { TableComponent } from '../../../utils/table/table.component';
import { CardComponent } from '../../../utils/card/card.component';
import { User } from '../../../core/models/user.interface';
import { UserService } from '../../../core/service/user/user.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [TableComponent,CardComponent, MatDialogModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().then((users) => {
      this.dataSource = users;
    });
  }

  displayedColumns: string[] = [
    'userName',
    'email',
    'role',
    'enabled',
    'accountNonExpired',
    'credentialsNonExpired',
    'accountNonLocked',
    'acciones'

  ];
  
  dataSource: User[] = [];

  editUser(user: User) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // El modal no se puede cerrar haciendo clic fuera de él
    dialogConfig.autoFocus = true;
    dialogConfig.data = { user }; // Puedes pasar datos al componente del modal si es necesario

    // Abre el modal
    const dialogRef = this.dialog.open(EditUserComponent, dialogConfig);

    // Suscríbete a eventos del modal si es necesario
    dialogRef.afterClosed().subscribe((result) => {
      // Lógica después de cerrar el modal (si es necesario)
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
        this.userService.deleteUser(user.id).then(() => {
          this.dataSource = this.dataSource.filter((u) => u.id !== user.id);
          Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
        });
      }
    });
  }

  selectUser(user: any) {
    //envio a la ruta de 'user' con la data del usuario seleccionado
    this.router.navigate(['user', user.id], { state: { user } });
    }

}
