import { NgModule } from '@angular/core';

import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormularioInputComponent } from './formulario-input/formulario-input.component';
import { BodyComponent } from './body/body.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubnivelMenuComponent } from './subnivel-menu/subnivel-menu.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { TableSeleccionadoComponent } from './table-seleccionado/table-seleccionado.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MatListModule } from '@angular/material/list';
import { TableExpandableComponent } from './table-expandable/table-expandable.component';

import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    FormularioInputComponent,
    ToolbarComponent,
    TableSeleccionadoComponent,
    AutocompleteComponent,
    TableExpandableComponent,
    LoginComponent,
    SubnivelMenuComponent,
    NavbarComponent,
    BodyComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    AppRoutingModule,
    
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    HttpClientModule,
    MatButtonModule,
    CardComponent,
    TableComponent,
    FormularioInputComponent,
    MatInputModule,
    ToolbarComponent,
    MatNativeDateModule,
    MatGridListModule,
    TableSeleccionadoComponent,
    AutocompleteComponent,
    MatListModule,
    TableExpandableComponent,
    LoginComponent,
    MatDialogModule,
    NavbarComponent,
    BodyComponent,
    CarouselComponent,
  ],
})
export class SharedModule {}
