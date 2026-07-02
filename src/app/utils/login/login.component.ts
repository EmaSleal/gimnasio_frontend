import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from '../card/card.component';
import { AuthService } from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CardComponent,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const username = this.loginForm.get('userName')?.value;
    const payload = username.includes('@')
      ? { email: username, password: this.loginForm.get('password')?.value }
      : this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: () => this.router.navigate(['/exercise']),
      error: () =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrectos',
        }),
    });
  }
}
