import { Component } from '@angular/core';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

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
  imports: [TableComponent, CardComponent, DynamicDialogModule, DataViewModule, TagModule, ButtonModule, CommonModule, ScrollPanelModule],
  templateUrl: './list-muscular-group.component.html',
  styleUrl: './list-muscular-group.component.scss'
})
export class ListMuscularGroupComponent {
  constructor(private muscularGroupService: MuscularGroupService, private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    this.muscularGroupService.getMuscularGroups().subscribe({
      next: (muscularGroups) => {
        this.dataSource = muscularGroups;
      }
    });
  }

  displayedColumns: string[] = [
    'name',
    'acciones'
  ];

  dataSource: MuscularGroup[] = [];

  editMuscularGroup(muscularGroup: MuscularGroup) {
    const ref = this.dialogService.open(EditMuscularGroupComponent, {
      data: { muscularGroup },
      header: 'Edit Muscular Group',
      width: '50%',
    });

    ref.onClose.subscribe((result) => {
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
        this.muscularGroupService.deleteMuscularGroup(muscularGroup.id || '').subscribe({
          next: () => {
            this.dataSource = this.dataSource.filter((u) => u.id !== muscularGroup.id);
            Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
          }
        });
      }
    });
  }

  selectMuscularGroup(muscularGroup: any) {
    this.router.navigate(['muscular-group', muscularGroup.id], { state: { muscularGroup } });
  }

  addMuscularGroup() {
    this.dialogService.open(AddMuscularGroupComponent, {
      header: 'Add Muscular Group',
      width: '50%',
    });
  }
}
