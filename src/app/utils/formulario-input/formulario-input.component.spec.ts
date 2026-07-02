import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FormularioInputComponent } from './formulario-input.component';

describe('FormularioInputComponent', () => {
  let component: FormularioInputComponent;
  let fixture: ComponentFixture<FormularioInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioInputComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioInputComponent);
    component = fixture.componentInstance;
    component.fields = [
      { id: 'name', name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Name', defaultValue: '' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
