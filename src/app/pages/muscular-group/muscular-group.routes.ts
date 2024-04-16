import { Routes } from '@angular/router';
import { MuscularGroupLayoutComponent } from './muscular-group-layout/muscular-group-layout.component';
import { AddMuscularGroupComponent } from './add-muscular-group/add-muscular-group.component';
import { EditMuscularGroupComponent } from './edit-muscular-group/edit-muscular-group.component';
import { ListMuscularGroupComponent } from './list-muscular-group/list-muscular-group.component';
import { MuscularGroupComponent } from './muscular-group/muscular-group.component';

export const routes: Routes = [
  //si el path es vacio redirige a login
  //agregar exercicio
  {
    path: '',
    component: MuscularGroupLayoutComponent,
    children: [
      { path: '', component: AddMuscularGroupComponent },
      //editar exercicio
      { path: 'edit', component: EditMuscularGroupComponent },
      //listar exercicios
      { path: 'list', component: ListMuscularGroupComponent },
      //ejercicio por id
      { path: ':id', component: MuscularGroupComponent },
    ],
  },
];

