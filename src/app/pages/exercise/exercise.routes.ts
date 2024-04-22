import { Routes } from '@angular/router';
import { ExerciseLayoutComponent } from './exercise-layout/exercise-layout.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { ListExerciseComponent } from './list-exercise/list-exercise.component';
import { ExerciseComponent } from './exercise/exercise.component';

export const routes: Routes = [
  //si el path es vacio redirige a login
  //agregar exercicio
  {
    path: '',
    component: ExerciseLayoutComponent,
    children: [
      { path: '', component: AddExerciseComponent },
      //editar exercicio
      { path: 'edit', component: EditExerciseComponent },
      //listar exercicios
      { path: 'list', component: ListExerciseComponent },
      //ejercicio por id
      { path: ':id', component: ExerciseComponent },
    ],
  },
];

