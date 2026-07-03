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
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { forkJoin } from 'rxjs';
import { ImageService } from '../../../core/service/image/image.service';
import baseUrl from '../../../core/service/helper';

@Component({
  selector: 'app-list-muscular-group',
  standalone: true,
  imports: [TableComponent, CardComponent, DynamicDialogModule, DataViewModule, TagModule, ButtonModule, CommonModule, ScrollPanelModule, FormsModule, InputTextModule],
  templateUrl: './list-muscular-group.component.html',
  styleUrl: './list-muscular-group.component.scss'
})
export class ListMuscularGroupComponent {
  constructor(
    private muscularGroupService: MuscularGroupService,
    private dialogService: DialogService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    this.muscularGroupService.getMuscularGroups().subscribe({
      next: (muscularGroups) => {
        this.dataSource = muscularGroups;
        this.tableDataSource = muscularGroups.map((m) => ({ ...m }));
        this.loadMuscularGroupImages();
        this.applyFilters();
      }
    });
  }

  displayedColumns: string[] = [
    'name',
    'acciones'
  ];

  dataSource: MuscularGroup[] = [];
  tableDataSource: MuscularGroup[] = [];
  filteredDataSource: MuscularGroup[] = [];
  filteredTableDataSource: MuscularGroup[] = [];
  searchTerm: string = '';
  filtersExpanded: boolean = false;

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const matches = (muscularGroup: MuscularGroup) => !term || (muscularGroup.name?.toLowerCase().includes(term) ?? false);
    this.filteredDataSource = this.dataSource.filter(matches);
    this.filteredTableDataSource = this.tableDataSource.filter(matches);
  }

  private loadMuscularGroupImages(): void {
    const requests = this.dataSource
      .filter((muscularGroup) => !!muscularGroup.id)
      .map((muscularGroup) => this.imageService.getImagesByMuscularGroup(muscularGroup.id!));

    if (!requests.length) {
      return;
    }

    forkJoin(requests).subscribe((imagesByMuscularGroup) => {
      const muscularGroupsWithId = this.dataSource.filter((muscularGroup) => !!muscularGroup.id);
      imagesByMuscularGroup.forEach((images, index) => {
        if (images.length > 0) {
          const imageUrl = `${baseUrl}${images[0].downloadUrl}`;
          muscularGroupsWithId[index].imageUrl = imageUrl;
          const tableEntry = this.tableDataSource.find((m) => m.id === muscularGroupsWithId[index].id);
          if (tableEntry) {
            tableEntry.imageUrl = imageUrl;
          }
        }
      });
      this.applyFilters();
    });
  }

  editMuscularGroup(muscularGroup: MuscularGroup) {
    const ref = this.dialogService.open(EditMuscularGroupComponent, {
      data: { muscularGroup },
      header: 'Edit Muscular Group',
      width: '50%',
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.refresh();
      }
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
            this.tableDataSource = this.tableDataSource.filter((u) => u.id !== muscularGroup.id);
            this.applyFilters();
            Swal.fire('¡Eliminado!', 'El grupo muscular ha sido eliminado.', 'success');
          }
        });
      }
    });
  }

  selectMuscularGroup(muscularGroup: any) {
    this.router.navigate(['muscular-group', muscularGroup.id], { state: { muscularGroup } });
  }
}
