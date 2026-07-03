import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import Swal from 'sweetalert2';
import { UserService } from '../../../core/service/user/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../../core/models/user.interface';
import { roleOptions } from '../../../core/models/role.enum';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  roleOptions = roleOptions;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    const user: User = this.config.data.user;
    this.userForm = new FormGroup({
      username: new FormControl(user.username, Validators.required),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      role: new FormControl(user.role, Validators.required),
      enabled: new FormControl(user.enabled),
    });
  }

  submitForm() {
    if (this.userForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.updateUser(this.config.data.user.id, this.userForm.value).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire('Usuario actualizado', 'El usuario ha sido actualizado con éxito', 'success');
        this.ref.close(true);
      },
      error: () => {
        this.loading = false;
        Swal.fire('Error', 'Ha ocurrido un error al actualizar el usuario', 'error');
      }
    });
  }

  cerrarModal() {
    this.ref.close();
  }
}
