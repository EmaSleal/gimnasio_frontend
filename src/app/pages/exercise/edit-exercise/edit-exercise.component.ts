import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../../../utils/card/card.component';
import { FormularioInputComponent } from '../../../utils/formulario-input/formulario-input.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MuscularLoad } from '../../../core/models/muscular-load.enum';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MuscularGroup } from '../../../core/models/muscular-group.interface';
import { Workout } from '../../../core/models/workout.interface';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-exercise',
  standalone: true,
  imports: [CardComponent, FormularioInputComponent, FloatLabelModule, FormsModule, ListboxModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './edit-exercise.component.html',
  styleUrl: './edit-exercise.component.scss'
})
export class EditExerciseComponent implements OnInit, OnChanges {

  constructor(
    private exerciseService: WorkoutService,
    private muscularGroupService: MuscularGroupService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  workout: Workout = {
    muscularGroup: {}
  };

  ngOnChanges(): void {
    console.log(this.muscularGroups);
    this.fields.map((field) => {
      if (field.id === 'muscularGroup') {
        field.options = this.muscularGroups;
      }
    });
  }

  ngOnInit(): void {
    const workout = this.config.data.workout;
    this.workout = workout;
    console.log(workout);
    this.fields = [
      {
        id: 'id',
        name: 'id',
        label: 'Id',
        defaultValue: workout.id,
        required: true,
        placeholder: 'Ingrese el nombre del ejercicio',
        type: 'text',
        hidden: true,
      },
      {
        id: 'name',
        name: 'name',
        label: 'Nombre',
        defaultValue: workout.name,
        required: true,
        placeholder: 'Ingrese el nombre del ejercicio',
        type: 'text',
        hidden: false,
      },
      {
        id: 'muscularGroup',
        name: 'muscularGroup',
        label: 'Grupo Muscular',
        defaultValue: workout?.muscularGroup?.id,
        required: true,
        placeholder: 'Ingrese el grupo muscular',
        type: 'select',
        options: this.muscularGroups,
        hidden: false,
      },
      {
        id: 'muscularLoad',
        name: 'muscularLoad',
        label: 'Carga Muscular',
        defaultValue: workout.muscularLoad,
        required: true,
        type: 'radio-button',
        options: [MuscularLoad.LOW, MuscularLoad.MEDIUM, MuscularLoad.HIGH],
        hidden: false,
      }
    ];

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

  fields: any[] = [];
  loading: boolean = false;
  muscularLoads = [MuscularLoad.LOW, MuscularLoad.MEDIUM, MuscularLoad.HIGH];

  formSubmit(data: any) {
    this.loading = true;
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === null) {
        delete data[key];
      }
    });
    this.exerciseService.saveWorkout(data).subscribe({
      next: (data) => {
        this.loading = false;
        Swal.fire({
          title: 'Ejercicio guardado!',
          text: 'Ejercicio guardado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.ref.close(true);
      },
      error: (error) => {
        this.loading = false;
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
    console.log(data);
  }
}
