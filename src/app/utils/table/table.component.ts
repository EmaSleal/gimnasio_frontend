// table.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() displayedColumns!: string[];
  @Input() dataSource!: any[];
  @Output() editItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dt') dt!: Table;

  constructor() {}

  ngOnInit() {}

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.dt) {
      this.dt.filterGlobal(value.trim().toLowerCase(), 'contains');
    }
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.forEach((element) => {
        for (let key in element) {
          if (typeof element[key] === 'object' && element[key] !== null) {
            if (element[key]?.name) {
              element[key] = element[key].name;
            } else if (element[key]?.description) {
              element[key] = element[key].description;
            }
          }
        }
      });
    }
  }

  editarFila(row: any) {
    this.editItem.emit(row);
  }

  eliminarFila(row: any) {
    this.deleteItem.emit(row);
  }

  filaClickeada(row: any) {
    this.rowClick.emit(row);
  }
}
