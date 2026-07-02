import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Workout } from '../../../core/models/workout.interface';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioInputComponent } from '../../../utils/formulario-input/formulario-input.component';
import { CardComponent } from '../../../utils/card/card.component';
import Swal from 'sweetalert2';
import { MuscularLoad } from '../../../core/models/muscular-load.enum';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [CardComponent, FloatLabelModule, FormsModule, ListboxModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.scss'
})
export class AddExerciseComponent implements OnInit, OnChanges {

  constructor(
    private exerciseService: WorkoutService,
    private muscularGroupService: MuscularGroupService,
    public ref: DynamicDialogRef
  ) {}

  ngOnChanges(): void {
    this.fields.map((field) => {
      if (field.id === 'muscularGroup') {
        field.options = this.muscularGroups;
      }
    });
  }

  ngOnInit(): void {
    this.muscularGroupService.getMuscularGroups().subscribe({
      next: (muscularGroups) => {
        this.muscularGroups = muscularGroups;
      }
    });
  }

  form: FormGroup = new FormGroup({});

  @ViewChild(FormularioInputComponent, { static: false })
  formularioInput!: FormularioInputComponent;

  enviarFormularios: boolean = false;
  resetearformularios: boolean = false;

  muscularGroups: any[] = [];
  camposPorEstado: any[] = [];
  loading: boolean = false;
  muscularLoads = [MuscularLoad.LOW, MuscularLoad.MEDIUM, MuscularLoad.HIGH];
  workout: Workout = {
    muscularGroup: {}
  };
  fields: any[] = [
    {
      id: 'name',
      name: 'name',
      label: 'Nombre',
      defaultValue: '',
      required: true,
      placeholder: 'Ingrese el nombre del ejercicio',
      type: 'text',
    },
    {
      id: 'muscularGroup',
      name: 'muscularGroup',
      label: 'Grupo Muscular',
      defaultValue: '',
      required: true,
      placeholder: 'Ingrese el grupo muscular',
      type: 'select',
      options: [],
    },
    {
      id: 'muscularLoad',
      name: 'muscularLoad',
      label: 'Carga Muscular',
      defaultValue: undefined,
      required: true,
      type: 'radio-button',
      options: [MuscularLoad.LOW, MuscularLoad.MEDIUM, MuscularLoad.HIGH],
    },
  ];

  formSubmit(data: any) {
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === null) {
        delete data[key];
      }
    });
    this.exerciseService.saveWorkout(data).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Ejercicio guardado!',
          text: 'Ejercicio guardado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.ref.close(true);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Error al guardar el ejercicio',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  formReset(data: any) {
    // Handle form reset
  }
}
