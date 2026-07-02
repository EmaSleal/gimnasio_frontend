import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CardComponent } from '../../../utils/card/card.component';
import Swal from 'sweetalert2';
import { UserService } from '../../../core/service/user/user.service';
import { ImportsModule } from "../../../utils/utils";
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    CardComponent,
    ImportsModule,
    PasswordModule,
],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  roleOptions = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Trainer', value: 'TRAINER' },
    { label: 'Client', value: 'CLIENT' },
  ];

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-/!@#$%^&*]).{8,}$/)]],
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
    if (this.userForm.invalid) {
      return;
    }
    this.userService.addUser(this.userForm.value).subscribe({
      next: () => {
        Swal.fire('Usuario creado', 'El usuario ha sido creado con éxito', 'success');
      },
      error: () => {
        Swal.fire('Error', 'Ha ocurrido un error al crear el usuario', 'error');
      }
    });
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
}
