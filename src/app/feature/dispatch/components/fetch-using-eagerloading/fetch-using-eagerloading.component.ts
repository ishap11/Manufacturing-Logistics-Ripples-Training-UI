import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchTracking } from '../../../../model/dispatch.model';
import { DispatchService } from '../../../../service/dispatch/dispatch.service';

@Component({
  selector: 'mlp-fetch-using-eagerloading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fetch-using-eagerloading.component.html',
  styleUrl: './fetch-using-eagerloading.component.scss'
})
export class FetchUsingEagerloadingComponent implements OnInit {

  dispatches: DispatchTracking[] = [];

  constructor(private dispatchService: DispatchService) { }

  ngOnInit(): void {

    this.dispatchService.getDispatchesUsingEagerLoading().subscribe({

      next: (response) => {

        this.dispatches = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}
/*import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mlp-fetch-using-eagerloading',
  imports: [ReactiveFormsModule],
  templateUrl: './fetch-using-eagerloading.component.html',
  styleUrl: './fetch-using-eagerloading.component.scss'
})
export class FetchUsingEagerloadingComponent {
 
  dispatches = [

    {
      dispatchId: 1001,
      dcId: 2,
      storeId: 101,
      dispatchDate: '2026-05-01',
      statusName: 'Pending'
    },

    {
      dispatchId: 1002,
      dcId: 1,
      storeId: 102,
      dispatchDate: '2026-05-02',
      statusName: 'Delivered'
    },

    {
      dispatchId: 1003,
      dcId: 1,
      storeId: 103,
      dispatchDate: '2026-05-16',
      statusName: 'Pending'
    }

  ];
}
*/