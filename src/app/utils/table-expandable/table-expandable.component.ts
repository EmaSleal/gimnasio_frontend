import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-table-expandable',
  templateUrl: './table-expandable.component.html',
  standalone: true,
  imports: [TableModule, CalendarModule, ButtonModule, InputTextModule],
  styleUrls: ['./table-expandable.component.scss']
})
export class TableExpandableComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // Not yet implemented — component is a stub pending full migration
  }
}
