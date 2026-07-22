import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchTracking } from '../../../../model/dispatch.model';
import { DispatchService } from '../../../../service/dispatch/dispatch.service';

@Component({
  selector: 'mlp-fetch-all-dispatch',
  imports: [CommonModule],
  templateUrl: './fetch-all-dispatch.component.html',
  styleUrl: './fetch-all-dispatch.component.scss'
})
export class FetchAllDispatchComponent implements OnInit {

  dispatches: DispatchTracking[] = [];

  noRecords = false;
  errorMessage = '';

  constructor(private dispatchService: DispatchService) { }

  ngOnInit(): void {

    this.dispatchService.getDispatches().subscribe({

      next: (response) => {

        this.dispatches = response;

        this.noRecords = response.length === 0;

        this.errorMessage = '';

      },

      error: () => {

        this.dispatches = [];

        this.noRecords = false;

        this.errorMessage = 'Unable to load dispatch records.';

      }

    });

  }

}
/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mlp-fetch-all-dispatch',
  imports: [CommonModule],
  templateUrl: './fetch-all-dispatch.component.html',
  styleUrl: './fetch-all-dispatch.component.scss'
})
export class FetchAllDispatchComponent {

  dispatches = [

    {
      dispatchId: 1001,
      dcId: 2,
      storeId: 101,
      dispatchDate: '2026-05-01',
      statusId: 1
    },

    {
      dispatchId: 1002,
      dcId: 1,
      storeId: 102,
      dispatchDate: '2026-05-02',
      statusId: 2
    },

    {
      dispatchId: 1003,
      dcId: 1,
      storeId: 103,
      dispatchDate: '2026-05-16',
      statusId: 1
    }

  ];

}
*/