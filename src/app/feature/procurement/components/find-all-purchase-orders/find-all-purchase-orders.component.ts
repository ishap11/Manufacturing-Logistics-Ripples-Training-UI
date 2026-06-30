import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-all-purchase-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './find-all-purchase-orders.component.html',
  styleUrl: './find-all-purchase-orders.component.css'
})
export class FindAllPurchaseOrdersComponent {

  purchaseOrders = [

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

  ];

}