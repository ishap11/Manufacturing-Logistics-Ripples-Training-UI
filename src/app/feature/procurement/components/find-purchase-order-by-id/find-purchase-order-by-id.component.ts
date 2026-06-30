import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-find-purchase-order-by-id',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './find-purchase-order-by-id.component.html',
  styleUrl: './find-purchase-order-by-id.component.css'
})
export class FindPurchaseOrderByIdComponent {

  purchaseOrderId: number | null = null;

  searched = false;

  productNames = [
    'Laptop',
    'Mouse',
    'Keyboard',
    'Monitor'
  ];

  searchPurchaseOrder(form: NgForm) {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    console.log(this.purchaseOrderId);

    this.searched = true;

  }

  resetForm(form: NgForm) {

    form.resetForm();

    this.searched = false;

  }

}