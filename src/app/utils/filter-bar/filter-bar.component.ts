import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBarComponent {
  @Input() filters: string[] = [];
  @Input() activeFilter: string = '';
  @Output() filterChange = new EventEmitter<string>();
}
