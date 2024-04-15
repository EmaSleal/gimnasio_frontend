// table.component.ts
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    MatPaginator,
    MatSort,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() displayedColumns!: string[];
  @Input() dataSource!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() editItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>(); // Nuevo evento

  tableDataSource!: MatTableDataSource<any>;

  constructor() {
    this.tableDataSource = new MatTableDataSource(this.dataSource);
  }

  ngOnInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.tableDataSource = new MatTableDataSource(this.dataSource);
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;

    this.dataSource.forEach((element) => {
      for (let key in element) {
        if (typeof element[key] === 'object') {
          if (element[key]?.name) {
            element[key] = element[key].name;
          } else if (element[key]?.description) {
            element[key] = element[key].description;
          }
        }
      }
    });
  }

  editarFila(row: any) {
    this.editItem.emit(row);
  }

  eliminarFila(row: any) {
    this.deleteItem.emit(row);
  }

  // Nueva función para manejar el clic en una fila
  filaClickeada(row: any) {
    this.rowClick.emit(row);
  }
}
