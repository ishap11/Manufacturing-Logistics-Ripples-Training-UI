import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { ProcurementService } from '../../../../service/procurement/procurement.service';
import { ProcurementPurchaseOrder } from '../../../../model/procurement.model';

@Component({
  selector: 'app-add-purchase-order-with-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-purchase-order-with-items.component.html',
  styleUrl: './add-purchase-order-with-items.component.css'
})
export class AddPurchaseOrderWithItemsComponent {

  constructor(
  private procurementService: ProcurementService
) { }

  today = new Date().toISOString().split('T')[0];

  tomorrow = new Date(Date.now() + 86400000)
    .toISOString()
    .split('T')[0];

  purchaseOrder = {

    purchaseOrderIdPk: null as number | null,

    supplierIdFk: null as number | null,

    purchaseOrderStatusIdFk: null as number | null,

    currencyIdFk: null as number | null,

    purchaseOrderDate: this.today,

    expectedDeliveryDate: '',

    itemList: [
      {
        purchaseOrderItemIdPk: null as number | null,
        productSupplierIdFk: null as number | null,
        purchasedQuantity: null as number | null,
        unitPrice: null as number | null
      }
    ]

  };

  successMessage = '';

errorMessage = '';

  addItem() {

    this.purchaseOrder.itemList.push({

      purchaseOrderItemIdPk: null,

      productSupplierIdFk: null,

      purchasedQuantity: null,

      unitPrice: null

    });

  }

  removeItem(index: number) {

    if (this.purchaseOrder.itemList.length > 1) {

      this.purchaseOrder.itemList.splice(index, 1);

    }

  }

  savePurchaseOrder(form: NgForm) {

  if (form.invalid) {

    form.control.markAllAsTouched();

    return;

  }

  this.successMessage = '';

  this.errorMessage = '';

  this.procurementService
    .insertPurchaseOrderWithItems(
      this.purchaseOrder as ProcurementPurchaseOrder
    )
    .subscribe({

      next: (response: string) => {

        this.successMessage = response;

        this.resetForm(form);

      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error || 'Unable to save Purchase Order with Items.';

      }

    });

}

  resetForm(form: NgForm) {

    form.resetForm({

      purchaseOrderIdPk: null,

      supplierIdFk: null,

      purchaseOrderStatusIdFk: null,

      currencyIdFk: null,

      purchaseOrderDate: this.today,

      expectedDeliveryDate: ''

    });

    this.purchaseOrder.itemList = [

      {

        purchaseOrderItemIdPk: null,

        productSupplierIdFk: null,

        purchasedQuantity: null,

        unitPrice: null

      }

    ];

  }

}