import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../utils/table/table.component';
import { User } from '../../../core/models/user.interface';
import { Role, ROLE_LABELS, roleOptions } from '../../../core/models/role.enum';
import { UserService } from '../../../core/service/user/user.service';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    TableComponent,
    DynamicDialogModule,
    CommonModule,
    FormsModule,
    DataViewModule,
    TagModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent implements OnInit {

  constructor(private userService: UserService, private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    this.refresh();
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
  tableDataSource: User[] = [];
  filteredDataSource: User[] = [];
  filteredTableDataSource: User[] = [];
  searchTerm: string = '';
  selectedRole: Role | null = null;
  filtersExpanded: boolean = false;
  roleOptions = roleOptions;

  refresh(): void {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource = users;
      this.tableDataSource = users.map((u) => ({ ...u }));
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const matches = (user: User) => {
      const matchesTerm = !term
        || (user.username?.toLowerCase().includes(term) ?? false)
        || (user.email?.toLowerCase().includes(term) ?? false);
      const matchesRole = !this.selectedRole || user.role === this.selectedRole;
      return matchesTerm && matchesRole;
    };
    this.filteredDataSource = this.dataSource.filter(matches);
    this.filteredTableDataSource = this.tableDataSource.filter(matches);
  }

  roleLabel(role: Role): string {
    return ROLE_LABELS[role];
  }

  editUser(user: User) {
    const ref = this.dialogService.open(EditUserComponent, {
      data: { user },
      header: 'Editar Usuario',
      width: '50%',
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.refresh();
      }
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
          this.tableDataSource = this.tableDataSource.filter((u) => u.id !== user.id);
          this.applyFilters();
          Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
        });
      }
    });
  }

  selectUser(user: any) {
    this.router.navigate(['user', user.id], { state: { user } });
  }
}
