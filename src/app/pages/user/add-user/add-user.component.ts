import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from '../../../utils/card/card.component';
import Swal from 'sweetalert2';
import { UserService } from '../../../core/service/user/user.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, CardComponent, ReactiveFormsModule,MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{
  userForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    
  }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
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
    this.userService.addUser(this.userForm.value).then(() => {
      Swal.fire('Usuario creado', 'El usuario ha sido creado con éxito', 'success');
    }, (err) => {
      Swal.fire('Error', 'Ha ocurrido un error al crear el usuario', 'error');
    });
  }
}