/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { ProcurementService } from '../../../../service/procurement/procurement.service';
import { PurchaseOrderProduct } from '../../../../model/procurement.model';

@Component({
  selector: 'app-find-purchase-order-by-id',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './find-purchase-order-by-id.component.html',
  styleUrl: './find-purchase-order-by-id.component.css'
})
export class FindPurchaseOrderByIdComponent {

  constructor(private procurementService: ProcurementService) {}

  productNames: PurchaseOrderProduct[] = [];

  purchaseOrderId: number | null = null;

  searched = false;

  errorMessage = '';

  searchPurchaseOrder(form: NgForm) {

  if (form.invalid) {
    form.control.markAllAsTouched();
    return;
  }

  this.searched = false;

  this.productNames = [];

  this.errorMessage = '';

  this.procurementService
    .getPurchaseOrderById(this.purchaseOrderId!)
    .subscribe({

      next: (response) => {

        this.productNames = response;

        this.searched = true;

      },

      error: (error) => {

        console.error(error);

        this.productNames = [];

        this.searched = false;

        this.errorMessage =
          error.error || 'Purchase Order not found';

      }

    });

}

  resetForm(form: NgForm) {

  form.resetForm();

  this.searched = false;

  this.productNames = [];

  this.errorMessage = '';

}

}