import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DispatchTracking } from '../../../../model/dispatch.model';
import { DispatchService } from '../../../../service/dispatch/dispatch.service';

@Component({
  selector: 'mlp-fetch-dispatch-by-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fetch-dispatch-by-id.component.html',
  styleUrl: './fetch-dispatch-by-id.component.scss'
})
export class FetchDispatchByIdComponent {

  fetchForm: any;

  selectedDispatch: DispatchTracking | null = null;

  noRecord = false;

  constructor(
    private fb: FormBuilder,
    private dispatchService: DispatchService
  ) {

    this.fetchForm = this.fb.group({

      dispatchId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$')
        ]
      ]

    });

  }

  search(): void {

    if (this.fetchForm.invalid) {

      this.fetchForm.markAllAsTouched();
      return;

    }

    const id = Number(this.fetchForm.value.dispatchId);

    this.dispatchService.getDispatchById(id).subscribe({

      next: (response) => {

        this.selectedDispatch = response;

        this.noRecord = false;

      },

      error: (error) => {

        console.error(error);

        this.selectedDispatch = null;

        this.noRecord = true;

      }

    });

  }

  reset(): void {

    this.fetchForm.reset();

    this.selectedDispatch = null;

    this.noRecord = false;

  }

}
/*import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mlp-fetch-dispatch-by-id',
  imports: [ReactiveFormsModule],
  templateUrl: './fetch-dispatch-by-id.component.html',
  styleUrl: './fetch-dispatch-by-id.component.scss'
})
export class FetchDispatchByIdComponent {

  fetchForm: any;

  dispatches = [

    {
      dispatchId: 1001,
      dcId: 1,
      storeId: 101,
      dispatchDate: '01-May-2026',
      statusId: 1
    },

    {
      dispatchId: 1002,
      dcId: 2,
      storeId: 102,
      dispatchDate: '02-May-2026',
      statusId: 2
    },

    {
      dispatchId: 1003,
      dcId: 1,
      storeId: 103,
      dispatchDate: '16-May-2026',
      statusId: 1
    },

    {
      dispatchId: 1004,
      dcId: 3,
      storeId: 104,
      dispatchDate: '22-May-2026',
      statusId: 3
    }

  ];

  selectedDispatch: any = null;

  noRecord = false;

  constructor(private fb: FormBuilder) {

    this.fetchForm = this.fb.group({

      dispatchId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$')
        ]
      ]

    });

  }

  search() {

    if (this.fetchForm.invalid) {

      this.fetchForm.markAllAsTouched();
      return;

    }

    const id = Number(this.fetchForm.value.dispatchId);

    this.selectedDispatch = this.dispatches.find(
      dispatch => dispatch.dispatchId === id
    );

    this.noRecord = !this.selectedDispatch;

  }

  reset() {

    this.fetchForm.reset();

    this.selectedDispatch = null;

    this.noRecord = false;

  }

}
*/