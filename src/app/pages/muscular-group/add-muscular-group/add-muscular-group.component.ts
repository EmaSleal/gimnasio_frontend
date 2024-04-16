import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from '../../../utils/card/card.component';
import Swal from 'sweetalert2';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';

@Component({
  selector: 'app-add-muscular-group',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, CardComponent, ReactiveFormsModule,MatInputModule, MatButtonModule, MatButtonModule],
  templateUrl: './add-muscular-group.component.html',
  styleUrl: './add-muscular-group.component.scss'
})
export class AddMuscularGroupComponent {

  muscularGroupForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private muscularGroupService: MuscularGroupService) {
    
  }
  ngOnInit(): void {
    this.muscularGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }



  submitForm() {
    if (this.muscularGroupForm.invalid) { // Verificación de nulidad para evitar el error
      return;
    }
    // Lógica para enviar los datos del usuario al servicio de Angular
    this.muscularGroupService.saveMuscularGroup(this.muscularGroupForm.value).then(() => {
      Swal.fire('Usuario creado', 'El usuario ha sido creado con éxito', 'success');
    }, (err) => {
      Swal.fire('Error', 'Ha ocurrido un error al crear el usuario', 'error');
    });
    
  }

}
