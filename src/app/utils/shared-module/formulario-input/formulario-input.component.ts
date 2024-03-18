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
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-formulario-input',
  templateUrl: './formulario-input.component.html',
  styleUrls: ['./formulario-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    // Solo reinitialize el formulario si cambia la lista de campos principales (fields)

    this.initializeForm();
  }

  initializeForm() {
    const formControls: { [key: string]: FormControl } = {};

    this.fields.forEach((field) => {
      const { name, defaultValue, required, validator, type } = field;

      if (type !== 'select') {
        // Utiliza el valor del modelo si existe, o el valor por defecto si no es un campo de tipo 'select'
        formControls[name] = new FormControl(
          this.form ? this.form.get(name)?.value : defaultValue
        );
      }
      if (type === 'checkbox') {
        formControls[name.toLowerCase() + '-input'] = new FormControl(null);
      } else {
        formControls[name] = new FormControl(undefined); // Establece el valor por defecto como 'undefined'
      }

      if (required) {
        console.log('required: ', required);
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

    //reviso si form es undefined, sino le agrego los nuevos campos
    if (this.form === undefined) {
      console.log('valor formulario ',this.form);
      
      this.form = new FormGroup(formControls);
      //agrego los nombres de los campos al array
      Object.keys(this.form.controls).forEach((key) => {
        this.initialFormNames.push(key);
      });
      
      
    } else {
      this.newformControls = new FormGroup(formControls);
      
      //elimino los campos de form que no estan en el array
      this.initialFormNames.forEach((key) => {
        if (this.newformControls.controls[key] === undefined) {
          this.form.removeControl(key);
        }
      });

      
      Object.keys(this.newformControls.controls).forEach((key) => {
        this.form.addControl(key, this.newformControls.controls[key]);
      });
    }
    //console.log('initialForm: ', this.initialFormNames);
    //console.log('form: ', this.form.controls);
  }

  onSubmit() {
    //console.log('Formulario válido: ', this.initialForm.value);
    //console.log('Formulario válido: ', this.form.value);
    if (this.form.valid) {
      //console.log('Formulario válido: ', this.form.value);

      this.formSubmitted.emit(this.form.value);
    } else {
      // Handle form validation errors
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
        // Validar que al menos una opción esté seleccionada en los radio buttons
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

  // Método para buscar form por nombre de campo y devuelve el valor
  getValorUnico(fieldName: string, value: any) {
    //console.log(`Campo "${fieldName}" cambió a: `, value);
    this.valorUnico.emit({ fieldName, value });
  }

  // Método para actualizar los campos del formulario

  toggleAdditionalField(option: string) {
    // Verificar si existe el campo adicional en el formulario
    //console.log('option: ', option);
    if (this.form.get(option.toLowerCase() + '-input')) {
      const currentValue = this.form.get(option.toLowerCase() + '-input');

      // Si el campo adicional tiene valor, vaciarlo; de lo contrario, eliminarlo del FormGroup.
      if (currentValue && currentValue.value) {
        currentValue.setValue(null);
      } else {
        this.form.removeControl(option.toLowerCase() + 'input');
      }
    }
  }
}
