import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mlp-add-dispatch',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dispatch.component.html',
  styleUrl: './add-dispatch.component.scss'
})
export class AddDispatchComponent {

  dispatchForm;

  constructor(private fb: FormBuilder) {

    this.dispatchForm = this.fb.group({

      dispatchId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$')
        ]
      ],

      dcId: ['', Validators.required],

      storeId: ['', Validators.required],

      dispatchDate: ['', Validators.required],

      status: ['', Validators.required]

    });

  }

  successMessage = '';

onSubmit() {

  if (this.dispatchForm.valid) {

    this.successMessage = 'Dispatch record added successfully.';

    this.dispatchForm.reset();

  } else {

    this.dispatchForm.markAllAsTouched();

  }

}

}