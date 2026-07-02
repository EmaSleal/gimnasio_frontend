import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-input',
  templateUrl: './formulario-input.component.html',
  styleUrls: ['./formulario-input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    RadioButtonModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
  ],
})
export class FormularioInputComponent implements OnInit, OnChanges {
  @Input() fields!: any[];
  @Input() enviarFormulario: boolean = false;
  @Input() resetFormulario: boolean = false;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() valorUnico: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  newformControls!: FormGroup;
  initialFormNames: string[] = [];

  additionalFields: { [key: string]: FormGroup | null } = {};
  camposPorEstado: any[] = [];

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initializeForm();
  }

  initializeForm() {
    const formControls: { [key: string]: FormControl } = {};

    this.fields.forEach((field) => {
      const { name, defaultValue, required, validator, type, hidden } = field;
      console.log('field: ', field);
      if (type !== 'select') {
        formControls[name] = new FormControl(
          this.form ? this.form.get(name)?.value : defaultValue
        );
      }
      if (type === 'checkbox') {
        formControls[name.toLowerCase() + '-input'] = new FormControl(null);
      } else {
        formControls[name] = new FormControl(undefined);
      }

      if (required) {
        formControls[name].setValidators([
          Validators.required,
          this.customValidator,
        ]);
      } else {
        formControls[name].setValidators(validator);
      }
      formControls[name].valueChanges.subscribe((value) => {
        this.getValorUnico(name, value);
      });
    });

    for (const additionalField of this.camposPorEstado) {
      formControls[additionalField.name] = new FormControl(null);
    }

    if (this.form === undefined) {
      this.form = new FormGroup(formControls);
      Object.keys(this.form.controls).forEach((key) => {
        this.initialFormNames.push(key);
      });
    } else {
      this.newformControls = new FormGroup(formControls);

      this.initialFormNames.forEach((key) => {
        if (this.newformControls.controls[key] === undefined) {
          this.form.removeControl(key);
        }
      });

      Object.keys(this.newformControls.controls).forEach((key) => {
        this.form.addControl(key, this.newformControls.controls[key]);
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }

  onReset() {
    this.form.reset();
  }

  customValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;

    if (control.parent) {
      const fieldType = control.parent.get('type')?.value;
      if (fieldType === 'radio') {
        if (value === undefined) {
          return { radioRequired: true };
        }
      }
    }
    if (value && value.length < 3) {
      return { custom: true };
    }
    return null;
  }

  getValorUnico(fieldName: string, value: any) {
    this.valorUnico.emit({ fieldName, value });
  }

  toggleAdditionalField(option: string) {
    if (this.form.get(option.toLowerCase() + '-input')) {
      const currentValue = this.form.get(option.toLowerCase() + '-input');

      if (currentValue && currentValue.value) {
        currentValue.setValue(null);
      } else {
        this.form.removeControl(option.toLowerCase() + 'input');
      }
    }
  }

  getHiddenClass(field: any) {
    return field ? 'hidden-field' : '';
  }
}
