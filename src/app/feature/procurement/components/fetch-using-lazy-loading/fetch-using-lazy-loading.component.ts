import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fetch-using-lazy-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fetch-using-lazy-loading.component.html',
  styleUrl: './fetch-using-lazy-loading.component.css'
})
export class FetchUsingLazyLoadingComponent {

  purchaseOrders = [

    {
      purchaseOrderIdPk: 101,
      supplierIdFk: 5,
      productIds: [17, 18, 20]
    },

    {
      purchaseOrderIdPk: 102,
      supplierIdFk: 8,
      productIds: [22, 25]
    },

    {
      purchaseOrderIdPk: 103,
      supplierIdFk: 12,
      productIds: [31, 32, 33, 34]
    }

  ];

}