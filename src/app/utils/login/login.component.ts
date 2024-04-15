import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { MatFormFieldModule } from '@angular/material/form-field';
import { CardComponent } from '../card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../core/service/login/login.service';

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
    const username = this.loginForm.get('userName')?.value;
    //si el username es un correo electronico cambio el json de envio como email y password
    if (username.includes('@')) {
      const email = this.loginForm.get('userName')?.value;
      const password = this.loginForm.get('password')?.value;
      this.loginService.login({email, password}).then((res) => {});
    }else{
      this.loginService.login(this.loginForm.value)
    }
  }

  

}
