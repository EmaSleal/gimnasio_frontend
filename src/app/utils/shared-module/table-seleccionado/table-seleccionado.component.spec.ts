import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSeleccionadoComponent } from './table-seleccionado.component';

describe('TableSeleccionadoComponent', () => {
  let component: TableSeleccionadoComponent;
  let fixture: ComponentFixture<TableSeleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSeleccionadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
