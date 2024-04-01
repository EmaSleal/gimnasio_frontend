import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ExerciseService } from '../../../service/exercise/exercise.service';
import { Exercise } from '../../../core/models/exercise.interface';
import { FormGroup } from '@angular/forms';
import { FormularioInputComponent } from '../../../utils/formulario-input/formulario-input.component';
import { CardComponent } from '../../../utils/card/card.component';
import { MuscularGroupService } from '../../../service/muscular-group/muscular-group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [CardComponent, FormularioInputComponent],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.scss'
})
export class AddExerciseComponent implements OnInit, OnChanges{


  constructor(private exerciseService: ExerciseService, private muscularGroupService: MuscularGroupService) {}
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
    
    //llamo al metodo getMuscularGroups para obtener los grupos musculares
    this.getMuscularGroups().then((data) => {
      this.muscularGroups = data;
      this.fields.map((field) => {
        if (field.id === 'muscularGroup') {
          field.options = this.muscularGroups;
        }
      });
    });

  }

  //realizo un metodo tipo promesa para obtener los grupos musculares
  async getMuscularGroups(): Promise<any> {
    return this.muscularGroupService.getMuscularGroups().toPromise();
  }

  form: FormGroup = new FormGroup({});

  @ViewChild(FormularioInputComponent, { static: false })
  formularioInput!: FormularioInputComponent;

  enviarFormularios: boolean = false;
  resetearformularios: boolean = false;

  muscularGroups: any[] = [];
  camposPorEstado: any[] = []; // Mantener una lista de campos adicionales según el estado

  fields: any[] = [
    {
      id: 'nombre',
      name: 'name',
      label: 'Nombre',
      defaultValue: '',
      required: true,
      placeholder: 'Ingrese el nombre del ejercicio',
      type: 'text',
    },
    {
      id: 'muscularGroup',
      name: 'descripcion',
      label: 'Grupo Muscular',
      defaultValue: '',
      required: true,
      placeholder: 'Ingrese el grupo muscular',
      type: 'select',
      options: this.muscularGroups,
    },
    {
      id: 'muscularLoad',
      name: 'estado',
      label: 'Estado',
      defaultValue: undefined,
      required: true,
      type: 'radio-button',
      options: ['liquido', 'solido', 'polvo'],
    },
  ];



  getCamposPorEstado(estado: any): any[] {
    const camposPorEstado: any[] = [];

    this.estadoOpciones[estado].forEach((exercise) => {
      camposPorEstado.push({
        name: exercise.toLowerCase().replace(/\s+/g, '-'), // Convertir el nombre en lowercase y reemplazar espacios con guiones
        label: exercise,
        defaultValue: undefined,
        required: true,
        placeholder: `Ingrese el ${exercise.toLowerCase()}`,
        type: 'checkbox',
      });
    });

    return camposPorEstado;
  }

  estadoOpciones: { [key: string]: string[] } = {
    liquido: ['250ml', '300ml', '500ml','500ml con tapa','500ml con dispensador', '700ml', '1L', '1/2gl', '1gl', '5gl'],
    solido: ['1kg'],
    polvo: ['1kg', '2.5kg', '5kg', '10kg', '25kg'],
  };

  formSubmit(data: any) {
    // Limpia los campos que su valor sea 'undefined' o 'null'
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === null) {
        delete data[key];
      }
    });

    //con cada valor que contenga en el nombre 'input' hago un objeto Exercise y lo agrego a un array
    let exercisesArray: Exercise[] = [];
    Object.keys(data).forEach((key) => {
      if (key.includes('input')) {
        let exercise: Exercise = {} as Exercise;
        exercise.name = data.nombre;
        exercise.muscularLoad = data.muscularLoad;
        exercise.muscularGroup = data.muscularGroup;
       

        exercisesArray.push(exercise);
        delete data[key];
      }
    });


    
    exercisesArray.forEach((exercise) => {
      this.exerciseService.saveExercise(exercise)
      .then((data) => {
        Swal.fire({
          title: 'Ejercicio guardado!',
          text: 'Ejercicio guardado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Error al guardar el ejercicio',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
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
