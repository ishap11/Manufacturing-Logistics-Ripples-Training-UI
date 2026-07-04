import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { SupplierService } from '../../../../service/supplier/supplier.service';

@Component({
  standalone: true,
  selector: 'mlp-update-supplier',
  imports: [FormsModule],
  templateUrl: './update-supplier.component.html',
  styleUrl: './update-supplier.component.scss'
})
export class UpdateSupplierComponent {
  supplierId: number | null = null;
  supplier = {
    companyName: '',
    supplierName: '',
    age: null as number | null,
    phone: '',
    address: '',
    city: ''
  };
  message = '';

  constructor(private supplierService: SupplierService) {}

  updateSupplier(form: NgForm): void {
    if (!this.supplierId || this.supplierId < 1) {
      this.message = 'Please enter a valid supplier ID.';
      return;
    }

    if (form.invalid) {
      this.message = 'Please fill in all required fields before saving.';
      return;
    }

    this.supplierService.updateSupplier(this.supplierId, {
      companyName: this.supplier.companyName,
      supplierName: this.supplier.supplierName,
      age: this.supplier.age ?? 0,
      phone: this.supplier.phone,
      address: this.supplier.address,
      city: this.supplier.city
    }).subscribe(updated => {
      if (!updated) {
        this.message = `Supplier ID ${this.supplierId} was not found.`;
        return;
      }

      const successMessage = `Supplier ${updated.supplierName} updated successfully.`;
      this.message = successMessage;
      window.alert(successMessage);
    }, () => {
      this.message = 'Unable to update supplier. Please try again.';
    });
  }
}
