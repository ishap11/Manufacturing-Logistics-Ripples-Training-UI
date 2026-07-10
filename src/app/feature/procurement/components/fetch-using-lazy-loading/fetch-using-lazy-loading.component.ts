import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementService } from '../../../../service/procurement/procurement.service';
import { LazyPurchaseOrder } from '../../../../model/procurement.model';

@Component({
  selector: 'app-fetch-using-lazy-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fetch-using-lazy-loading.component.html',
  styleUrl: './fetch-using-lazy-loading.component.css'
})
export class FetchUsingLazyLoadingComponent implements OnInit{

  constructor(
  private procurementService: ProcurementService
) {}

  purchaseOrders: LazyPurchaseOrder[] = [];

errorMessage = '';

ngOnInit(): void {

  this.purchaseOrders = [];

  this.errorMessage = '';

  this.procurementService
    .fetchUsingLazyLoading()
    .subscribe({

      next: (response) => {

        const groupedOrders: LazyPurchaseOrder[] = [];

        response.forEach(item => {

          let order = groupedOrders.find(
            x => x.purchaseOrderIdPk === item.purchaseOrderIdPk
          );

          if (!order) {

            order = {

              purchaseOrderIdPk: item.purchaseOrderIdPk,

              supplierIdFk: item.supplierIdFk,

              productName: []

            };

            groupedOrders.push(order);

          }

          order.productName.push(item.productName);

        });

        this.purchaseOrders = groupedOrders;

        if (this.purchaseOrders.length === 0) {

          this.errorMessage = 'No Purchase Orders found.';

        }

      },

      error: (error) => {

        console.error(error);

        this.purchaseOrders = [];

        this.errorMessage =
          error.error || 'Unable to fetch Purchase Orders.';

      }

    });

}

}