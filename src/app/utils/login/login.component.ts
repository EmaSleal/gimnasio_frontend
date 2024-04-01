import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { LoginService } from '../../service/login/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardComponent } from '../card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule,MatFormFieldModule, CardComponent, ReactiveFormsModule,MatInputModule, MatButtonModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // Aquí deberías hacer una llamada al servicio de autenticación
    // para verificar las credenciales. Por ahora, simplemente redirigiremos
    // a la página de inicio después de un inicio de sesión "exitoso".
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/exercise']);
          Swal.fire({
            title: 'Bienvenido!',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        })
        .catch((error) => {

          Swal.fire({
            title: 'Error!',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        });
      //this.router.navigate(['/home']);

    }
  }

  

}
