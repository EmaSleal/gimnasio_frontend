import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInputComponent } from './formulario-input.component';

describe('FormularioInputComponent', () => {
  let component: FormularioInputComponent;
  let fixture: ComponentFixture<FormularioInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
