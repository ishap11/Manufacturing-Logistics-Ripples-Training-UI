import { Component } from '@angular/core';

import { ProcurementService } from '../../../../service/procurement/procurement.service';

import { ProcurementPurchaseOrder } from '../../../../model/procurement.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-purchase-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-purchase-order.component.html',
  styleUrl: './add-purchase-order.component.css'
})
export class AddPurchaseOrderComponent {

  constructor(
  private procurementService: ProcurementService
) { }

  today: string = new Date().toISOString().split('T')[0];

  tomorrow: string = new Date(Date.now() + 86400000)
    .toISOString()
    .split('T')[0];

  purchaseOrder = {
    purchaseOrderIdPk: null as number | null,
    supplierIdFk: null as number | null,
    purchaseOrderStatusIdFk: null as number | null,
    currencyIdFk: null as number | null,
    purchaseOrderDate: this.today,
    expectedDeliveryDate: ''
  };

  successMessage = '';

errorMessage = '';

  savePurchaseOrder(form: NgForm) {

  if (form.invalid) {

    form.control.markAllAsTouched();

    return;

  }

  this.successMessage = '';

  this.errorMessage = '';

  this.procurementService
    .insertPurchaseOrder(
      this.purchaseOrder as ProcurementPurchaseOrder
    )
    .subscribe({

      next: (response: string) => {

        this.successMessage = response;

      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error || 'Unable to save Purchase Order.';

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

    this.successMessage = '';

    this.errorMessage = '';

  }

}