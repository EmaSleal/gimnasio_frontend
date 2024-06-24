import { Component } from '@angular/core';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { MuscularGroup } from '../../../core/models/muscular-group.interface';
import { EditMuscularGroupComponent } from '../edit-muscular-group/edit-muscular-group.component';
import { Router } from '@angular/router';
import { CardComponent } from '../../../utils/card/card.component';
import { TableComponent } from '../../../utils/table/table.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { AddMuscularGroupComponent } from '../add-muscular-group/add-muscular-group.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-list-muscular-group',
  standalone: true,
  imports: [TableComponent,CardComponent, MatDialogModule,DataViewModule, TagModule, ButtonModule, CommonModule, ScrollPanelModule],
  templateUrl: './list-muscular-group.component.html',
  styleUrl: './list-muscular-group.component.scss'
})
export class ListMuscularGroupComponent {
  constructor(private muscularGroupService: MuscularGroupService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.muscularGroupService.getMuscularGroups().then((muscularGroups) => {
      this.dataSource = muscularGroups;
    });
  }

  displayedColumns: string[] = [
    'name',
    'acciones'
  ];
  
  dataSource: MuscularGroup[] = [];

  editMuscularGroup(muscularGroup: MuscularGroup) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // El modal no se puede cerrar haciendo clic fuera de él
    dialogConfig.autoFocus = true;
    dialogConfig.data = { muscularGroup }; // Puedes pasar datos al componente del modal si es necesario

    // Abre el modal
    const dialogRef = this.dialog.open(EditMuscularGroupComponent, dialogConfig);

    // Suscríbete a eventos del modal si es necesario
    dialogRef.afterClosed().subscribe((result) => {
      // Lógica después de cerrar el modal (si es necesario)
      console.log('Modal cerrado con resultado:', result);
    });
  }

  deleteMuscularGroup(muscularGroup: MuscularGroup) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.muscularGroupService.deleteMuscularGroup(muscularGroup.id || '').then(() => {
          this.dataSource = this.dataSource.filter((u) => u.id !== muscularGroup.id);
          Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
        });
      }
    });
  }

  selectMuscularGroup(muscularGroup: any) {
    //envio a la ruta de 'muscularGroup' con la data del usuario seleccionado
    this.router.navigate(['muscular-group', muscularGroup.id], { state: { muscularGroup } });
    }

    addMuscularGroup() {
      const dialogConfig = new MatDialogConfig();
      //dialogConfig.disableClose = true; // El modal no se puede cerrar haciendo clic fuera de él
      dialogConfig.autoFocus = true;
      //le agrego al modal el 50% de la pantalla si la pantalla es suerior 768px
  
      // Abre el modal
      const dialogRef = this.dialog.open(AddMuscularGroupComponent, dialogConfig);
  
      // Suscríbete a eventos del modal si es necesario
      dialogRef.afterClosed().subscribe((result) => {
        // Lógica después de cerrar el modal (si es necesario)
        //console.log('Modal cerrado con resultado:', result);
      });
    }
}
