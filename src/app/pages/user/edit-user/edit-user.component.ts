import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from '../../../utils/card/card.component';
import Swal from 'sweetalert2';
import { UserService } from '../../../core/service/user/user.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../core/models/user.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, CardComponent, ReactiveFormsModule,MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{
  userForm: FormGroup = new FormGroup({});


  constructor(private formBuilder: FormBuilder, private userService: UserService,public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }) {
      
    
  }
  ngOnInit(): void {
    const user = this.data.user;
    console.log(user);
    this.userForm = new FormGroup({
      userName: new FormControl(user.userName, Validators.required),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      role: new FormControl(user.role, Validators.required),
      enabled: new FormControl(user.enabled),
      accountNonExpired: new FormControl(user.accountNonExpired),
      credentialsNonExpired: new FormControl(user.credentialsNonExpired),
      accountNonLocked: new FormControl(user.accountNonLocked),
    });
    
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  submitForm() {
    if (this.userForm.invalid) { // Verificación de nulidad para evitar el error
      return;
    }
    // Lógica para enviar los datos del usuario al servicio de Angular
    this.userService.updateUser(this.userForm.value).then(() => {
      Swal.fire('Usuario creado', 'El usuario ha sido creado con éxito', 'success');
    }, (err) => {
      Swal.fire('Error', 'Ha ocurrido un error al crear el usuario', 'error');
    });
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
