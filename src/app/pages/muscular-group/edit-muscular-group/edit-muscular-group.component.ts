import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from '../../../utils/card/card.component';
import { MuscularGroup } from '../../../core/models/muscular-group.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-muscular-group',
  standalone: true,
  imports: [FormsModule, CardComponent, ReactiveFormsModule, FloatLabelModule, InputTextModule, ButtonModule],
  templateUrl: './edit-muscular-group.component.html',
  styleUrl: './edit-muscular-group.component.scss'
})
export class EditMuscularGroupComponent {
  muscularGroupForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private muscularGroupService: MuscularGroupService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    const muscularGroup: MuscularGroup = this.config.data.muscularGroup;
    console.log(muscularGroup);
    this.muscularGroupForm = new FormGroup({
      id: new FormControl(muscularGroup.id),
      name: new FormControl(muscularGroup.name, Validators.required),
    });
  }

  submitForm() {
    if (this.muscularGroupForm.invalid) {
      return;
    }

    const id = this.muscularGroupForm.value.id;
    this.muscularGroupService.updateMuscularGroup(id, this.muscularGroupForm.value).subscribe({
      next: () => {
        this.ref.close(true);
      },
      error: (err) => {
        console.error('Error updating muscular group', err);
      }
    });
  }

  cerrarModal() {
    this.ref.close();
  }
}
