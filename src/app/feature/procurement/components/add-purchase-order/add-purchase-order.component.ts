import { Component } from '@angular/core';
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

  savePurchaseOrder(form: NgForm) {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    console.log(this.purchaseOrder);
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

  }

}