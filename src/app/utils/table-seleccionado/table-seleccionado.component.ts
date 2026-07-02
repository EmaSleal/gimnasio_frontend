import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table-seleccionado',
  templateUrl: './table-seleccionado.component.html',
  styleUrls: ['./table-seleccionado.component.scss'],
  standalone: true,
  imports: [TableModule, InputTextModule, ButtonModule],
})
export class TableSeleccionadoComponent implements OnInit, OnChanges {

  @Input() displayedColumns!: string[];
  @Input() dataSource!: any[];
  @Output() getRows: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dt') dt!: Table;

  selectedRows: any[] = [];

  constructor() {}

  ngOnInit() {}

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.dt) {
      this.dt.filterGlobal(value.trim().toLowerCase(), 'contains');
    }
  }

  ngOnChanges() {
    this.selectedRows = [];
  }

  onRowSelect(event: any) {
    this.getRows.emit(this.selectedRows);
  }

  onRowUnselect(event: any) {
    this.getRows.emit(this.selectedRows);
  }
}
