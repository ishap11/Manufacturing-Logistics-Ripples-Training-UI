import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { DispatchTracking } from '../../../../model/dispatch.model';
import { DispatchService } from '../../../../service/dispatch/dispatch.service';

@Component({
  selector: 'mlp-filter-by-dc-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-by-dc-id.component.html',
  styleUrl: './filter-by-dc-id.component.scss'
})
export class FilterByDcIdComponent {

  filterForm: any;

  filteredDispatches: DispatchTracking[] = [];

  noRecords = false;

  constructor(
    private fb: FormBuilder,
    private dispatchService: DispatchService
  ) {

    this.filterForm = this.fb.group({
      dcId: ['', Validators.required]
    });

  }

  search(): void {

    if (this.filterForm.invalid) {

      this.filterForm.markAllAsTouched();
      return;

    }

    const dcId = Number(this.filterForm.value.dcId);

    this.dispatchService.filterByDcId(dcId).subscribe({

      next: (response) => {

        this.filteredDispatches = response;

        this.noRecords = response.length === 0;

      },

      error: (error) => {

        console.error(error);

        this.filteredDispatches = [];

        this.noRecords = true;

      }

    });

  }

  reset(): void {

    this.filterForm.reset();

    this.filteredDispatches = [];

    this.noRecords = false;

  }

}
/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mlp-filter-by-dc-id',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-by-dc-id.component.html',
  styleUrl: './filter-by-dc-id.component.scss'
})
export class FilterByDcIdComponent {

  filterForm: any;

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

  filteredDispatches: any[] = [];

  noRecords = false;

  constructor(private fb: FormBuilder) {

    this.filterForm = this.fb.group({
      dcId: ['', Validators.required]
    });

  }

  search(): void {

    if (this.filterForm.invalid) {

      this.filterForm.markAllAsTouched();
      return;

    }

    const dcId = Number(this.filterForm.value.dcId);

    this.filteredDispatches = this.dispatches.filter(
      dispatch => dispatch.dcId === dcId
    );

    this.noRecords = this.filteredDispatches.length === 0;

  }

  reset(): void {

    this.filterForm.reset();

    this.filteredDispatches = [];

    this.noRecords = false;

  }

}
*/