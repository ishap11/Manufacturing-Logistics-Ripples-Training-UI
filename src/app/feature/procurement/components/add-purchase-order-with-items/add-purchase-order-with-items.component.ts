import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-purchase-order-with-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-purchase-order-with-items.component.html',
  styleUrl: './add-purchase-order-with-items.component.css'
})
export class AddPurchaseOrderWithItemsComponent {

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

    console.log(this.purchaseOrder);

    alert("Purchase Order with Items Saved Successfully");

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