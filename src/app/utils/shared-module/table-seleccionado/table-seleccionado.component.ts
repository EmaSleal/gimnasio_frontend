import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-seleccionado',
  templateUrl: './table-seleccionado.component.html',
  styleUrls: ['./table-seleccionado.component.scss']
})
export class TableSeleccionadoComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() displayedColumns!: string[];
  @Input() dataSource!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() getRows: EventEmitter<any> = new EventEmitter<any>();


  tableDataSource!: MatTableDataSource<any>;
  selectedRows: Set<any> = new Set<any>();

  constructor() {
    this.tableDataSource = new MatTableDataSource(this.dataSource);
  }

  ngOnInit() {
  }

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
  }

  toggleSelection(row: any) {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
      this.getSelectedRows();
    }
  }

  getSelectedRows() {
    this.getRows.emit(Array.from(this.selectedRows));
  }


}