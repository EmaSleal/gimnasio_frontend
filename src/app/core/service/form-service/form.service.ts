import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  forms: any[] = [];

  constructor(private formbuilder: FormBuilder) { }

  addForm(form: FormGroup) {
    const values = form.value;
    this.forms.push(values);
  }

  getForms() {
    //if daysOfWeek is empty or workoutSpecification is empty, remove it
    return this.forms;
  }

  clearForms() {
    this.forms = [];
  }

  removeForm(index: number) {
    this.forms.splice(index, 1);
  }

  getForm(index: number) {
    return this.forms[index];
  }

  
}
