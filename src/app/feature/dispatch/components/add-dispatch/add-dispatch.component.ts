import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { DispatchService } from '../../../../service/dispatch/dispatch.service';
import { AddDispatch } from '../../../../model/dispatch.model';

@Component({
  selector: 'mlp-add-dispatch',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-dispatch.component.html',
  styleUrl: './add-dispatch.component.scss'
})
export class AddDispatchComponent {

  successMessage = '';
errorMessage = '';

  dispatchForm;

  constructor(
    private fb: FormBuilder,
    private dispatchService: DispatchService
  ) {

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

  onSubmit(): void {
    
  this.successMessage = '';
  this.errorMessage = '';

    if (this.dispatchForm.invalid) {

      this.dispatchForm.markAllAsTouched();
      return;

    }

    const dispatch:AddDispatch = {

      dispatchIdPk: Number(this.dispatchForm.value.dispatchId),

      dcIdFk: Number(this.dispatchForm.value.dcId),

      storeIdFk: Number(this.dispatchForm.value.storeId),

      dispatchStatusIdFk: Number(this.dispatchForm.value.status),

      dispatchDate: this.dispatchForm.value.dispatchDate!,

      createdBy: 'Admin'

    };

    this.dispatchService.addDispatch(dispatch).subscribe({

  next: (response) => {

    this.successMessage = response;
    this.errorMessage = '';

    this.dispatchForm.reset();

  },

  error: (error) => {

    this.successMessage = '';
    this.errorMessage = error.error;

  }

});

  }

}
/*import { Component } from '@angular/core';
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
*/