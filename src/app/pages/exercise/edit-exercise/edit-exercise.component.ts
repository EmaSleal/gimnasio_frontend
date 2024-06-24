import { Component, Inject, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../../../utils/card/card.component';
import { FormularioInputComponent } from '../../../utils/formulario-input/formulario-input.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MuscularLoad } from '../../../core/models/muscular-load.enum';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  imports: [MatDialogModule,CardComponent, FormularioInputComponent, FloatLabelModule, FormsModule, ListboxModule , InputTextModule,ReactiveFormsModule, ButtonModule],
  templateUrl: './edit-exercise.component.html',
  styleUrl: './edit-exercise.component.scss'
})
export class EditExerciseComponent implements OnInit, OnChanges{


  constructor(private exerciseService: WorkoutService, private muscularGroupService: MuscularGroupService, public dialogRef: MatDialogRef<EditExerciseComponent>, @Inject(MAT_DIALOG_DATA) public data: { workout: Workout }) {}
  workout: Workout = {
    muscularGroup: {}
  };
  
  ngOnChanges(): void {
    //busco en fields el campo con id muscularGroup y le asigno el valor de la respuesta de la peticion en el valor options
    console.log(this.muscularGroups);
    this.fields.map((field) => {
      if (field.id === 'muscularGroup') {

        field.options = this.muscularGroups;
      }
    });
    
  }
  ngOnInit(): void {
    const workout = this.data.workout
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
    //console.log('workout: ',workout);
   
    
    //llamo al metodo getMuscularGroups para obtener los grupos musculares
    this.muscularGroupService.getMuscularGroups().then((muscularGroups) => {
      this.muscularGroups = muscularGroups;
      //console.log(this.muscularGroups);
    });
  }

  //realizo un metodo tipo promesa para obtener los grupos musculares


  form: FormGroup = new FormGroup({});

  @ViewChild(FormularioInputComponent, { static: false })
  formularioInput!: FormularioInputComponent;

  enviarFormularios: boolean = false;
  resetearformularios: boolean = false;

  muscularGroups: any[] = [];
  camposPorEstado: any[] = []; // Mantener una lista de campos adicionales según el estado

  fields: any[] = [];
  loading: boolean = false;
  muscularLoads = [MuscularLoad.LOW, MuscularLoad.MEDIUM, MuscularLoad.HIGH]

  formSubmit(data: any) {
    this.loading = true;
    // Limpia los campos que su valor sea 'undefined' o 'null'
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === null) {
        delete data[key];
      }
    });
    //console.log(data);
      this.exerciseService.saveWorkout(data)
      .then((data) => {
        this.loading = false
        Swal.fire({
          title: 'Ejercicio guardado!',
          text: 'Ejercicio guardado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      })
      .catch((error) => {
        this.loading = false
        Swal.fire({
          title: 'Error!',
          text: 'Error al guardar el ejercicio',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });

    

    //console.log(exercisesArray);
    //console.log(this.getCamposPorEstado('estado'));
  }

  formReset(data: any) {
    // Handle form reset
    console.log(data);
  }

}
