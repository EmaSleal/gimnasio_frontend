import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TableSeleccionadoComponent } from './table-seleccionado.component';

describe('TableSeleccionadoComponent', () => {
  let component: TableSeleccionadoComponent;
  let fixture: ComponentFixture<TableSeleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSeleccionadoComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSeleccionadoComponent);
    component = fixture.componentInstance;
    component.displayedColumns = ['name', 'acciones'];
    component.dataSource = [
      { name: 'Alice' },
      { name: 'Bob' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render p-table', () => {
    const table = fixture.nativeElement.querySelector('p-table');
    expect(table).toBeTruthy();
  });

  it('should not render mat-table', () => {
    const matTable = fixture.nativeElement.querySelector('[mat-table]');
    expect(matTable).toBeNull();
  });
});
