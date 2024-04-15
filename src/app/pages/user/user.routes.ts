import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: AddUserComponent },

      { path: 'edit', component: EditUserComponent },

      { path: 'list', component: ListUserComponent },

      { path: ':id', component: UserComponent },
    ],
  },
];

