/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementService } from '../../../../service/procurement/procurement.service';
import { ProcurementPurchaseOrder } from '../../../../model/procurement.model';

@Component({
  selector: 'app-find-all-purchase-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './find-all-purchase-orders.component.html',
  styleUrl: './find-all-purchase-orders.component.css'
})
/*export class FindAllPurchaseOrdersComponent {*/
export class FindAllPurchaseOrdersComponent implements OnInit {

  purchaseOrders: ProcurementPurchaseOrder[] = [];

  errorMessage = '';

  constructor(
  private procurementService: ProcurementService
) { }

ngOnInit(): void {

  this.purchaseOrders = [];

  this.errorMessage = '';

  this.procurementService
    .getAllPurchaseOrders()
    .subscribe({

      next: (response) => {

        this.purchaseOrders = response;

      },

      error: (error) => {

        console.error(error);

        this.purchaseOrders = [];

        this.errorMessage =
          error.error || 'Unable to fetch Purchase Orders.';

      }

    });

}

  /*purchaseOrders = [

    {
      purchaseOrderIdPk: 1,
      supplierIdFk: 5,
      purchaseOrderStatusIdFk: 12,
      currencyIdFk: 6,
      purchaseOrderDate: '2026-06-01',
      expectedDeliveryDate: '2026-06-10'
    },

    {
      purchaseOrderIdPk: 2,
      supplierIdFk: 7,
      purchaseOrderStatusIdFk: 10,
      currencyIdFk: 6,
      purchaseOrderDate: '2026-06-03',
      expectedDeliveryDate: '2026-06-12'
    },

    {
      purchaseOrderIdPk: 3,
      supplierIdFk: 9,
      purchaseOrderStatusIdFk: 15,
      currencyIdFk: 1,
      purchaseOrderDate: '2026-06-05',
      expectedDeliveryDate: '2026-06-14'
    }

  ];*/

}