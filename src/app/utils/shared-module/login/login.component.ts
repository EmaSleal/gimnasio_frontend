import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
      console.log(this.loginForm.value);
      this.loginService.login(this.loginForm.value).subscribe(
        (data: any) => {
          console.log(data);
          /*localStorage.setItem('user', data);*/
          this.router.navigate(['/home']);
          Swal.fire({
            title: 'Bienvenido!',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        },
        (error) => {
          //console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      );
      
      this.router.navigate(['/home']);
    }
  }

}
