import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardComponent } from '../../../utils/card/card.component';
import Swal from 'sweetalert2';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';

@Component({
  selector: 'app-add-muscular-group',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CardComponent,
  ],
  templateUrl: './add-muscular-group.component.html',
  styleUrl: './add-muscular-group.component.scss'
})
export class AddMuscularGroupComponent {

  muscularGroupForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private muscularGroupService: MuscularGroupService) {}

  ngOnInit(): void {
    this.muscularGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.muscularGroupForm.invalid) {
      return;
    }
    this.muscularGroupService.saveMuscularGroup(this.muscularGroupForm.value).subscribe({
      next: () => {
        Swal.fire('Usuario creado', 'El usuario ha sido creado con éxito', 'success');
      },
      error: (err) => {
        Swal.fire('Error', 'Ha ocurrido un error al crear el usuario', 'error');
      }
    });
  }
}
