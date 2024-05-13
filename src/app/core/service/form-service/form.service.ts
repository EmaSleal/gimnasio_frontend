import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  forms: FormGroup[] = [];

  constructor() { }

  addForm(form: FormGroup) {
    this.forms.push(form);
  }

  getForms() {
    return this.forms;
  }
}
