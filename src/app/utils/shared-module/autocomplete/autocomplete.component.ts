import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnChanges {
  @Input() suggestions: any[] = [];
  @Output() selected = new EventEmitter<any>();
  listDataSource: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['suggestions'] && changes['suggestions'].currentValue) {
      this.listDataSource = changes['suggestions'].currentValue;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  
    this.listDataSource = this.suggestions.filter((suggestion) =>
      (suggestion.nombre && suggestion.nombre.toLowerCase().includes(filterValue.toLowerCase())) ||
      (suggestion.presentacion && suggestion.presentacion.toLowerCase().includes(filterValue.toLowerCase())) 
    );

  }

  onSelect(suggestion: any): void {
    this.selected.emit(suggestion);
  }
}
