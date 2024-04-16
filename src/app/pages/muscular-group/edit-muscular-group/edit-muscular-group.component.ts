import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from '../../../utils/card/card.component';
import { MuscularGroup } from '../../../core/models/muscular-group.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-muscular-group',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, CardComponent, ReactiveFormsModule,MatInputModule, MatButtonModule, MatButtonModule],
  templateUrl: './edit-muscular-group.component.html',
  styleUrl: './edit-muscular-group.component.scss'
})
export class EditMuscularGroupComponent {
  muscularGroupForm: FormGroup = new FormGroup({});


  constructor(private formBuilder: FormBuilder, private muscularGroupService: MuscularGroupService,public dialogRef: MatDialogRef<EditMuscularGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { muscularGroup: MuscularGroup }) {
      
    
  }
  ngOnInit(): void {
    const muscularGroup = this.data.muscularGroup;
    console.log(muscularGroup);
    this.muscularGroupForm = new FormGroup({
      id: new FormControl(muscularGroup.id),
      name: new FormControl(muscularGroup.name, Validators.required),
      
    });
    
  }

  submitForm() {
    if (this.muscularGroupForm.invalid) { // Verificación de nulidad para evitar el error
      return;
    }

    // Lógica para enviar los datos del usuario al servicio de Angular
    this.muscularGroupService.updateMuscularGroup(this.muscularGroupForm.value).then();
    this.dialogRef.close();
  }
  cerrarModal() {
    this.dialogRef.close();
  }

}
